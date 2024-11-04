import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentMessage = new BehaviorSubject<any>(null);

  private messaging;

  constructor() {
    // Initialize Firebase
    initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging();

    // Subscribe to messages when the app is in the foreground
    onMessage(this.messaging, (payload) => {
      console.log('Message received: ', payload);
      this.currentMessage.next(payload);
    });
  }

  requestPermission(): void {
    getToken(this.messaging, {
      vapidKey: 'BL9kus-XGMB8QLAtk-5RcBvEjf2oS71ysB__a2Uu8GVkQ4wOSGGfSuI1QF6y-TvAxo7D0kQs1G9KD7wG6p_PS0w'
    }) // Replace with your VAPID key
      .then((token) => {
        console.log('FCM Token:', token);
        this.currentMessage.next(token);
      })
      .catch((error) => {
        console.error('Error getting token:', error);
      });
  }
}
