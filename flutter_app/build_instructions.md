
# Build Instructions for Flutter Mobile App

This guide explains how to build the application package for Android (`.apk`) and the high-level steps for iOS (`.ipa`).

## 1. Prerequisites

- **Flutter SDK**: Ensure you have the Flutter SDK installed and the `flutter` command is in your system's PATH. Follow the official guide at [flutter.dev](https://flutter.dev).
- **Android Studio** (for Android SDK and emulator).
- **Xcode** (for iOS build, macOS only).
- **An editor** like VS Code with the Flutter extension.

## 2. Setup Project

1.  **Open a terminal or command prompt**.

2.  **Navigate to the `flutter_app` directory**:
    ```bash
    cd path/to/your/project/flutter_app
    ```

3.  **Get dependencies**:
    ```bash
    flutter pub get
    ```

## 3. Build for Android (.apk)

This process creates a universal APK that can be installed on Android devices.

1.  **Run the build command**:
    ```bash
    flutter build apk --release
    ```
    This command compiles the Dart code, includes the native Kotlin code, and produces a highly optimized release APK.

2.  **Locate the APK file**:
    The output file will be located in the `build` directory:
    
    `flutter_app/build/app/outputs/flutter-apk/app-release.apk`

3.  **Install on a device**:
    - Connect your Android device to your computer with USB debugging enabled.
    - You can install the APK using ADB (Android Debug Bridge):
      ```bash
      adb install build/app/outputs/flutter-apk/app-release.apk
      ```
    - Alternatively, you can copy the `.apk` file to your device and open it with a file manager to install it.

## 4. Build for iOS (.ipa)

Building for iOS is more complex and **requires a macOS computer and an Apple Developer account**.

### High-Level Steps:

1.  **Prepare for iOS Build**:
    Make sure your app runs correctly on an iOS simulator or a connected device.
    ```bash
    flutter run --release
    ```

2.  **Set Up iOS Extension**:
    Follow the detailed instructions in `ios_extension_setup.md` to create the Broadcast Upload Extension, which is **mandatory** for screen sharing on iOS. This involves creating a new target, setting up App Groups, and adding code to `SampleHandler.swift`.

3.  **Open Xcode**:
    Open the iOS project in Xcode.
    ```bash
    open ios/Runner.xcworkspace
    ```

4.  **Configure Signing & Capabilities**:
    - In Xcode, select the `Runner` target and go to the `Signing & Capabilities` tab.
    - Select your Team from the dropdown. You need a paid Apple Developer account to sign apps for real devices.
    - Make sure the Bundle Identifier is unique.
    - **Crucially**, repeat this for your `ScreenShareExtension` target. Both the main app and the extension must be signed with the same developer account and team.

5.  **Archive the Application**:
    - From the Xcode menu, select `Product > Archive`. This will build the app and open the Organizer window.
    - If the Archive option is grayed out, make sure you have `Any iOS Device (arm64)` selected as the build target (next to the play/stop buttons).

6.  **Distribute the .ipa**:
    - In the Organizer window, you will see your new archive.
    - Click the `Distribute App` button.
    - Choose a distribution method:
      - **Ad Hoc**: To install on a limited number of registered test devices.
      - **App Store Connect**: To upload to the App Store.
    - Follow the on-screen instructions. Xcode will bundle your app, re-sign it for distribution, and generate an `.ipa` file that you can save locally or upload.
