
# Build Instructions for Windows Server App

This guide explains how to create a single `.exe` file for the screen sharing server application.

## 1. Prerequisites

- **Python 3.8+**: Ensure Python is installed and added to your system's PATH. You can download it from [python.org](https://python.org).
- **Git** (optional, for cloning).

## 2. Setup Python Environment

It is highly recommended to use a virtual environment to manage dependencies.

1.  **Open Command Prompt** or PowerShell.

2.  **Navigate to the `windows_app` directory**:
    ```bash
    cd path/to/your/project/windows_app
    ```

3.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    ```

4.  **Activate the virtual environment**:
    ```bash
    .\venv\Scripts\activate
    ```
    Your command prompt should now be prefixed with `(venv)`.

5.  **Install the required packages**:
    ```bash
    pip install -r requirements.txt
    ```

6.  **Install PyInstaller**:
    ```bash
    pip install pyinstaller
    ```

## 3. Test the Application

Before building, run the application from the source code to ensure everything is working correctly.
```bash
python main.py
```
The application window should appear, and you should be able to start the server.

## 4. Build the .exe with PyInstaller

PyInstaller analyzes your code and bundles all necessary files into a single executable.

1.  **Run the PyInstaller command**:
    In your activated virtual environment, run the following command from the `windows_app` directory. This command creates a single, windowed executable named `ScreenShareServer.exe`.

    ```bash
    pyinstaller --onefile --windowed --name ScreenShareServer main.py
    ```

    - `--onefile`: Bundles everything into a single `.exe`.
    - `--windowed`: Prevents a console window from appearing when the GUI app runs.
    - `--name ScreenShareServer`: Sets the name of the final executable.

2.  **Locate the Executable**:
    PyInstaller will create a few folders (`build`, `dist`, and a `.spec` file). Your final executable will be located in the `dist` folder:
    
    `windows_app\dist\ScreenShareServer.exe`

3.  **Distribute**:
    You can now copy `ScreenShareServer.exe` to any other Windows 10/11 machine and run it without needing to install Python or any dependencies.

## Troubleshooting

- **Hidden Imports**: Sometimes PyInstaller fails to detect all necessary libraries (especially for packages like `uvicorn` or `fastapi`). If the `.exe` crashes on startup, you may need to specify hidden imports. Check the console output when running the crashing `.exe` for clues.
  
  Example of adding a hidden import:
  ```bash
  pyinstaller --onefile --windowed --name ScreenShareServer --hidden-import="uvicorn.lifespan.on" main.py
  ```
