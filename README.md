# Offline Screen Share

This project is a cross-platform, offline screen sharing system that allows mobile devices (Android/iOS) to stream their screen to a Windows PC over a local Wi-Fi network.

## Project Structure

The repository is organized into three main parts:

-   **/windows_app**: Contains the Python server application for Windows.
    -   `main.py`: The main application source code (PyQt6 GUI, FastAPI/WebSocket server).
    -   `requirements.txt`: Python dependencies.
    -   `build_instructions.md`: Guide to build the `.exe` installer using PyInstaller.

-   **/flutter_app**: Contains the Flutter mobile client for Android and iOS.
    -   `lib/main.dart`: The main application source code.
    -   `android/`: Android-specific native code, including the `ScreenCaptureService`.
    -   `ios/`: iOS-specific native code, including the `AppDelegate` and a placeholder for the `ScreenShareExtension`.
    -   `pubspec.yaml`: Flutter dependencies.
    -   `build_instructions.md`: Guide to build the `.apk` and `.ipa`.
    -   `ios_extension_setup.md`: Mandatory guide for setting up screen sharing on iOS.

-   **Web Documentation**:
    -   `index.html` & `index.tsx`: A simple web-based project overview page.

## How It Works

1.  **Windows Server**: A Python application provides a GUI to view the screen share. It starts a WebSocket server on the local network. The server's local IP address is displayed in the app.
2.  **Mobile Client**: The Flutter app connects to the server's IP address.
3.  **Streaming**:
    -   On **Android**, the app uses the `MediaProjection` API to capture the screen and streams frames to the server via WebSocket.
    -   On **iOS**, the app uses the `ReplayKit` framework via a Broadcast Upload Extension to capture the screen and stream frames.
4.  **Protocol**: All communication happens over a local WebSocket connection (`ws://<server_ip>:8000/ws`). Frames are sent as base64-encoded JPEGs within a JSON payload.

The entire system is designed to work completely offline, requiring only a local network connection between the devices.
