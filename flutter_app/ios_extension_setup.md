
# iOS Broadcast Upload Extension Setup Guide

Screen sharing on iOS is more complex than on Android due to Apple's security policies. You cannot directly capture the screen from your main app. Instead, you must provide a "Broadcast Upload Extension," which the operating system runs in a separate process.

## 1. Create the Extension Target in Xcode

1.  Open your Flutter project's iOS workspace: `open ios/Runner.xcworkspace`.
2.  In Xcode, go to `File > New > Target...`.
3.  Select the `Broadcast Upload Extension` template and click `Next`.
4.  Name it (e.g., `ScreenShareExtension`), select `Swift` as the language, and ensure "Embed in Application" is set to `Runner`.
5.  Click `Finish`. Xcode will ask if you want to activate the new scheme; click `Activate`.

## 2. Set Up App Groups

Your main app and the extension are separate processes. To communicate (e.g., to share the server IP), you need to set up an "App Group".

1.  In Xcode, select the `Runner` target, then go to the `Signing & Capabilities` tab.
2.  Click `+ Capability` and add `App Groups`.
3.  Click the `+` button under App Groups and create a new group. The name must be unique, typically `group.com.yourdomain.yourapp`. For this project, use `group.com.example.screenshare`.
4.  **Repeat the exact same steps for your `ScreenShareExtension` target**. Select the extension target, go to `Signing & Capabilities`, add the `App Groups` capability, and select the *same* group identifier you just created.

## 3. Implement the `SampleHandler.swift`

Xcode created a `SampleHandler.swift` file inside your new extension's folder. This is where the magic happens. The OS will call `processSampleBuffer` with video and audio frames.

Replace the contents of `SampleHandler.swift` with code that connects to your WebSocket server and sends the frames.

**`ScreenShareExtension/SampleHandler.swift` Example:**
```swift
import ReplayKit
import Starscream // A popular WebSocket library for Swift

// You must add Starscream to your Extension target via Swift Package Manager or CocoaPods.
// File > Add Packages... > https://github.com/daltoniam/Starscream

class SampleHandler: RPBroadcastSampleHandler {

    var websocket: WebSocket?
    var userDefaults = UserDefaults(suiteName: "group.com.example.screenshare")
    var timer: Timer?

    override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
        // User has started the broadcast.
        guard let ip = userDefaults?.string(forKey: "serverIP"),
              let deviceName = userDefaults?.string(forKey: "deviceName") else {
            // Handle error: IP not found
            let error = NSError(domain: "com.example.screenshare", code: 1, userInfo: [NSLocalizedDescriptionKey: "Server IP not set."])
            finishBroadcastWithError(error)
            return
        }

        var request = URLRequest(url: URL(string: "ws://\(ip):8000/ws")!)
        request.timeoutInterval = 5
        websocket = WebSocket(request: request)
        websocket?.connect()
        
        // Timer to check if main app requested a stop
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            if self?.userDefaults?.bool(forKey: "stopCapture") == true {
                self?.userDefaults?.set(false, forKey: "stopCapture") // Reset flag
                self?.finishBroadcast()
            }
        }
    }

    override func broadcastPaused() {
        // User has paused the broadcast.
    }

    override func broadcastResumed() {
        // User has resumed the broadcast.
    }

    override func broadcastFinished() {
        // User has finished the broadcast.
        websocket?.disconnect()
        timer?.invalidate()
    }

    override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
        switch sampleBufferType {
        case .video:
            // Handle video buffer
            guard let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer),
                  let websocket = websocket, websocket.isConnected else {
                return
            }

            let ciImage = CIImage(cvPixelBuffer: imageBuffer)
            let context = CIContext()
            
            guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
                return
            }
            
            let image = UIImage(cgImage: cgImage)
            
            // Compress to JPEG and encode to Base64
            if let jpegData = image.jpegData(compressionQuality: 0.5), // 50% quality
               let deviceName = userDefaults?.string(forKey: "deviceName") {
                
                let base64String = jpegData.base64EncodedString()
                
                let payload: [String: String] = ["device": deviceName, "frame": base64String]
                if let jsonData = try? JSONEncoder().encode(payload),
                   let jsonString = String(data: jsonData, encoding: .utf8) {
                    websocket.write(string: jsonString)
                }
            }
            
        case .audioApp:
            // Handle audio buffer for app audio. Ignored for this project.
            break
        case .audioMic:
            // Handle audio buffer for microphone audio. Ignored for this project.
            break
        @unknown default:
            fatalError("Unknown sample buffer type")
        }
    }
    
    private func finishBroadcast() {
        let error = NSError(domain: "com.example.screenshare", code: 0, userInfo: [NSLocalizedDescriptionKey: "Broadcast finished by app."])
        finishBroadcastWithError(error)
    }
}
```

## 4. Update Main App to Share Data

In your main Flutter app, before calling `startCapture`, you must save the IP address and device name to the shared `UserDefaults`.

**Modify `lib/main.dart` `_startSharing` method:**

```dart
// ... inside _startSharing, before calling platform.invokeMethod
// This requires a new method channel to save data.

// Add this to your MethodChannel in MainActivity
await _platform.invokeMethod('saveSettings', {
  'ip': _ipController.text,
  'deviceName': _deviceName,
});

await _platform.invokeMethod('startCapture');
//...
```

**Add the `saveSettings` handler in `AppDelegate.swift`:**
```swift
// Inside your MethodChannel handler in AppDelegate.swift
if call.method == "saveSettings" {
    if let args = call.arguments as? [String: Any],
       let ip = args["ip"] as? String,
       let deviceName = args["deviceName"] as? String,
       let userDefaults = UserDefaults(suiteName: "group.com.example.screenshare") {
        userDefaults.set(ip, forKey: "serverIP")
        userDefaults.set(deviceName, forKey: "deviceName")
        userDefaults.set(false, forKey: "stopCapture") // Reset stop flag
        result(nil)
    } else {
        result(FlutterError(code: "INVALID_ARGS", message: "Invalid arguments", details: nil))
    }
}
//...
```

This completes the basic setup for iOS screen sharing. It is significantly more involved than the Android implementation.
