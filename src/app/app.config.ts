import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { UpdateService } from './Service/update.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([authInterceptor])), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // Initialize Firebase
  provideMessaging(() => getMessaging()), provideServiceWorker("/firebase-messaging-sw.js")]
};
