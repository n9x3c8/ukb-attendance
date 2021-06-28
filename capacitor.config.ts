import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.tranquocbn.attendance',
    appName: 'UKB Attendance',
    webDir: 'www',
    // server: {
    //     "hostname": "woala932.000webhostapp.com",
    //     "androidScheme": "https"
    // },
    plugins: {
        SplashScreen: {
            launchShowDuration: 0,
            launchAutoHide: true
        }
    },
}

export default config;