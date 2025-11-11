import React from 'react';
import { createRoot } from 'react-dom/client';

const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#333',
        lineHeight: '1.6',
    },
    header: {
        fontSize: '2rem',
        color: '#1a1a1a',
        borderBottom: '2px solid #eee',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
    },
    subHeader: {
        fontSize: '1.5rem',
        color: '#1a1a1a',
        marginTop: '2rem',
    },
    paragraph: {
        fontSize: '1rem',
    },
    section: {
        marginTop: '1.5rem',
    },
    code: {
        fontFamily: 'monospace',
        backgroundColor: '#f4f4f4',
        padding: '0.2rem 0.4rem',
        borderRadius: '4px',
    },
    list: {
        paddingLeft: '20px',
    }
};

const App = () => (
    <div style={styles.container}>
        <h1 style={styles.header}>Offline Screen Share System</h1>
        <p style={styles.paragraph}>
            Welcome! This project contains the complete source code for a cross-platform, offline screen sharing system.
        </p>
        <div style={styles.section}>
            <h2 style={styles.subHeader}>Components</h2>
            <ul style={styles.list}>
                <li><b>Windows Server:</b> Found in the <code style={styles.code}>/windows_app</code> directory.</li>
                <li><b>Mobile Client (Flutter):</b> Found in the <code style={styles.code}>/flutter_app</code> directory for both Android and iOS.</li>
            </ul>
        </div>
        <div style={styles.section}>
            <h2 style={styles.subHeader}>How to Run</h2>
            <p>To build and run the applications, please follow the detailed instructions provided in the markdown files:</p>
            <ol style={styles.list}>
                <li><b>For the Windows Server:</b> See <code style={styles.code}>windows_app/build_instructions.md</code></li>
                <li><b>For the Flutter Mobile App (Android & iOS):</b> See <code style={styles.code}>flutter_app/build_instructions.md</code></li>
                <li><b>For specific iOS setup:</b> You must also follow <code style={styles.code}>flutter_app/ios_extension_setup.md</code></li>
            </ol>
             <p style={styles.paragraph}>
               The Android build error you encountered has been resolved by updating the native Android code to use the modern Flutter v2 embedding. You can now proceed with the build instructions.
            </p>
        </div>
    </div>
);

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
