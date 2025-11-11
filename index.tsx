
import React from 'react';
import { createRoot } from 'react-dom/client';

const styles = {
    container: {
        padding: '2rem',
    },
    header: {
        textAlign: 'center' as 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
        marginBottom: '2rem',
    },
    title: {
        color: '#2c3e50',
    },
    description: {
        color: '#7f8c8d',
        fontSize: '1.1rem',
    },
    section: {
        marginBottom: '2.5rem',
    },
    sectionTitle: {
        color: '#34495e',
        borderBottom: '2px solid #3498db',
        paddingBottom: '0.5rem',
        display: 'inline-block',
    },
    card: {
        background: '#ecf0f1',
        padding: '1.5rem',
        borderRadius: '5px',
        marginTop: '1rem',
    },
    code: {
        fontFamily: 'monospace',
        background: '#2c3e50',
        color: '#fff',
        padding: '0.2rem 0.5rem',
        borderRadius: '3px',
    },
    details: {
        marginTop: '1rem',
        border: '1px solid #bdc3c7',
        borderRadius: '4px',
    },
    summary: {
        fontWeight: 'bold' as 'bold',
        padding: '0.8rem',
        cursor: 'pointer',
        backgroundColor: '#e0e6e8',
        color: '#2c3e50',
    },
    pre: {
        whiteSpace: 'pre-wrap' as 'pre-wrap',
        wordWrap: 'break-word' as 'break-word',
        background: '#fdfdfd',
        padding: '1rem',
        margin: '0',
        overflowX: 'auto' as 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.5',
    }
};

const windowsBuildInstructions = `# Build Instructions for Windows Server App

This guide explains how to create a single \`.exe\` file for the screen sharing server application.

## 1. Prerequisites

- **Python 3.8+**: Ensure Python is installed and added to your system's PATH. You can download it from [python.org](https://python.org).
- **Git** (optional, for cloning).

## 2. Setup Python Environment

It is highly recommended to use a virtual environment to manage dependencies.

1.  **Open Command Prompt** or PowerShell.

2.  **Navigate to the \`windows_app\` directory**:
    \`\`\`bash
    cd path/to/your/project/windows_app
    \`\`\`

3.  **Create a virtual environment**:
    \`\`\`bash
    python -m venv venv
    \`\`\`

4.  **Activate the virtual environment**:
    \`\`\`bash
    .\\venv\\Scripts\\activate
    \`\`\`
    Your command prompt should now be prefixed with \`(venv)\`.

5.  **Install the required packages**:
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`

6.  **Install PyInstaller**:
    \`\`\`bash
    pip install pyinstaller
    \`\`\`

## 3. Test the Application

Before building, run the application from the source code to ensure everything is working correctly.
\`\`\`bash
python main.py
\`\`\`
The application window should appear, and you should be able to start the server.

## 4. Build the .exe with PyInstaller

PyInstaller analyzes your code and bundles all necessary files into a single executable.

1.  **Run the PyInstaller command**:
    In your activated virtual environment, run the following command from the \`windows_app\` directory. This command creates a single, windowed executable named \`ScreenShareServer.exe\`.

    \`\`\`bash
    pyinstaller --onefile --windowed --name ScreenShareServer main.py
    \`\`\`

    - \`--onefile\`: Bundles everything into a single \`.exe\`.
    - \`--windowed\`: Prevents a console window from appearing when the GUI app runs.
    - \`--name ScreenShareServer\`: Sets the name of the final executable.

2.  **Locate the Executable**:
    PyInstaller will create a few folders (\`build\`, \`dist\`, and a \`.spec\` file). Your final executable will be located in the \`dist\` folder:
    
    \`windows_app\\dist\\ScreenShareServer.exe\`

3.  **Distribute**:
    You can now copy \`ScreenShareServer.exe\` to any other Windows 10/11 machine and run it without needing to install Python or any dependencies.

## Troubleshooting

- **Hidden Imports**: Sometimes PyInstaller fails to detect all necessary libraries (especially for packages like \`uvicorn\` or \`fastapi\`). If the \`.exe\` crashes on startup, you may need to specify hidden imports. Check the console output when running the crashing \`.exe\` for clues.
  
  Example of adding a hidden import:
  \`\`\`bash
  pyinstaller --onefile --windowed --name ScreenShareServer --hidden-import="uvicorn.lifespan.on" main.py
  \`\`\``;

const mobileBuildInstructions = `# Build Instructions for Flutter Mobile App

This guide explains how to build the application package for Android (\`.apk\`) and the high-level steps for iOS (\`.ipa\`).

## 1. Prerequisites

- **Flutter SDK**: Ensure you have the Flutter SDK installed and the \`flutter\` command is in your system's PATH. Follow the official guide at [flutter.dev](https://flutter.dev).
- **Android Studio** (for Android SDK and emulator).
- **Xcode** (for iOS build, macOS only).
- **An editor** like VS Code with the Flutter extension.

## 2. Setup Project

1.  **Open a terminal or command prompt**.

2.  **Navigate to the \`flutter_app\` directory**:
    \`\`\`bash
    cd path/to/your/project/flutter_app
    \`\`\`

3.  **Get dependencies**:
    \`\`\`bash
    flutter pub get
    \`\`\`

## 3. Build for Android (.apk)

This process creates a universal APK that can be installed on Android devices.

1.  **Run the build command**:
    \`\`\`bash
    flutter build apk --release
    \`\`\`
    This command compiles the Dart code, includes the native Kotlin code, and produces a highly optimized release APK.

2.  **Locate the APK file**:
    The output file will be located in the \`build\` directory:
    
    \`flutter_app/build/app/outputs/flutter-apk/app-release.apk\`

3.  **Install on a device**:
    - Connect your Android device to your computer with USB debugging enabled.
    - You can install the APK using ADB (Android Debug Bridge):
      \`\`\`bash
      adb install build/app/outputs/flutter-apk/app-release.apk
      \`\`\`
    - Alternatively, you can copy the \`.apk\` file to your device and open it with a file manager to install it.

## 4. Build for iOS (.ipa)

Building for iOS is more complex and **requires a macOS computer and an Apple Developer account**.

### High-Level Steps:

1.  **Prepare for iOS Build**:
    Make sure your app runs correctly on an iOS simulator or a connected device.
    \`\`\`bash
    flutter run --release
    \`\`\`

2.  **Set Up iOS Extension**:
    Follow the detailed instructions in \`ios_extension_setup.md\` to create the Broadcast Upload Extension, which is **mandatory** for screen sharing on iOS. This involves creating a new target, setting up App Groups, and adding code to \`SampleHandler.swift\`.

3.  **Open Xcode**:
    Open the iOS project in Xcode.
    \`\`\`bash
    open ios/Runner.xcworkspace
    \`\`\`

4.  **Configure Signing & Capabilities**:
    - In Xcode, select the \`Runner\` target and go to the \`Signing & Capabilities\` tab.
    - Select your Team from the dropdown. You need a paid Apple Developer account to sign apps for real devices.
    - Make sure the Bundle Identifier is unique.
    - **Crucially**, repeat this for your \`ScreenShareExtension\` target. Both the main app and the extension must be signed with the same developer account and team.

5.  **Archive the Application**:
    - From the Xcode menu, select \`Product > Archive\`. This will build the app and open the Organizer window.
    - If the Archive option is grayed out, make sure you have \`Any iOS Device (arm64)\` selected as the build target (next to the play/stop buttons).

6.  **Distribute the .ipa**:
    - In the Organizer window, you will see your new archive.
    - Click the \`Distribute App\` button.
    - Choose a distribution method:
      - **Ad Hoc**: To install on a limited number of registered test devices.
      - **App Store Connect**: To upload to the App Store.
    - Follow the on-screen instructions. Xcode will bundle your app, re-sign it for distribution, and generate an \`.ipa\` file that you can save locally or upload.`;

const iosExtensionSetup = `# iOS Broadcast Upload Extension Setup Guide

Screen sharing on iOS is more complex than on Android due to Apple's security policies. You cannot directly capture the screen from your main app. Instead, you must provide a "Broadcast Upload Extension," which the operating system runs in a separate process.

## 1. Create the Extension Target in Xcode

1.  Open your Flutter project's iOS workspace: \`open ios/Runner.xcworkspace\`.
2.  In Xcode, go to \`File > New > Target...\`.
3.  Select the \`Broadcast Upload Extension\` template and click \`Next\`.
4.  Name it (e.g., \`ScreenShareExtension\`), select \`Swift\` as the language, and ensure "Embed in Application" is set to \`Runner\`.
5.  Click \`Finish\`. Xcode will ask if you want to activate the new scheme; click \`Activate\`.

## 2. Set Up App Groups

Your main app and the extension are separate processes. To communicate (e.g., to share the server IP), you need to set up an "App Group".

1.  In Xcode, select the \`Runner\` target, then go to the \`Signing & Capabilities\` tab.
2.  Click \`+ Capability\` and add \`App Groups\`.
3.  Click the \`+\` button under App Groups and create a new group. The name must be unique, typically \`group.com.yourdomain.yourapp\`. For this project, use \`group.com.example.screenshare\`.
4.  **Repeat the exact same steps for your \`ScreenShareExtension\` target**. Select the extension target, go to \`Signing & Capabilities\`, add the \`App Groups\` capability, and select the *same* group identifier you just created.

## 3. Implement the \`SampleHandler.swift\`

Xcode created a \`SampleHandler.swift\` file inside your new extension's folder. The OS will call \`processSampleBuffer\` with video frames. Replace its contents with code that connects to your WebSocket server.

## 4. Update Main App to Share Data

In your main Flutter app, before starting the capture, you must save the IP address and device name to the shared \`UserDefaults\` so the extension can read them. This is done via a method channel call from Flutter to your native Swift code in \`AppDelegate.swift\`.`;


const Instructions = ({ title, content }: { title: string, content: string }) => (
    <details style={styles.details}>
        <summary style={styles.summary}>{title}</summary>
        <pre style={styles.pre}>{content}</pre>
    </details>
);

const App = () => (
    <div style={styles.container}>
        <header style={styles.header}>
            <h1 style={styles.title}>Offline Screen Share</h1>
            <p style={styles.description}>
                A cross-platform, offline screen sharing system using Python for the server and Flutter for mobile clients.
            </p>
        </header>

        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Windows Server Application</h2>
            <div style={styles.card}>
                <p>
                    The server is a standalone Windows application built with Python. It uses PyQt6 for the graphical user interface and FastAPI/WebSockets to receive the screen stream from clients.
                </p>
                <ul>
                    <li><strong>GUI:</strong> PyQt6</li>
                    <li><strong>Backend:</strong> FastAPI & Uvicorn</li>
                    <li><strong>Protocol:</strong> WebSocket</li>
                </ul>
                <p>
                    To build the server into a single <code style={styles.code}>.exe</code> file, follow the instructions below.
                </p>
                <Instructions title="View Windows Build Instructions" content={windowsBuildInstructions} />
            </div>
        </section>

        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Flutter Mobile Client (Android & iOS)</h2>
            <div style={styles.card}>
                <p>
                    The mobile client is built with Flutter, allowing a single codebase for both Android and iOS. It captures the screen using native platform channels and streams it to the Windows server.
                </p>
                <ul>
                    <li><strong>Framework:</strong> Flutter</li>
                    <li><strong>Android Capture:</strong> <code style={styles.code}>MediaProjection</code> API</li>
                    <li><strong>iOS Capture:</strong> <code style={styles.code}>ReplayKit</code> Framework</li>
                </ul>
                 <p>
                    Building the mobile apps requires following specific steps, especially for iOS.
                </p>
                <Instructions title="View Mobile Build Instructions" content={mobileBuildInstructions} />
                <br />
                <Instructions title="View iOS Extension Setup Guide" content={iosExtensionSetup} />
            </div>
        </section>
    </div>
);

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
