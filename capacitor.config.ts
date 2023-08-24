import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pashka1837.contactsApp',
  appName: 'contacts-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
