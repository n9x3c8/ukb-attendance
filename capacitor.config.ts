import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.tranquocbn.attendance',
    appName: 'UKB Attendance',
    webDir: 'www',
    plugins: {
        SplashScreen: {
            launchShowDuration: 0,
            launchAutoHide: true
        }
    },
    android: {
        webContentsDebuggingEnabled: false
    }
}

export default config;