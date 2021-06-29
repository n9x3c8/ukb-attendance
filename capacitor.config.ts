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
}

export default config;