import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Service/notification-service.service';
import { FirebaseService } from '../../Service/firebase.service';

@Component({
  selector: 'app-notification-component',
  standalone: true,
  imports: [],
  templateUrl: './notification-component.component.html',
  styleUrl: './notification-component.component.css'
})
export class NotificationComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.firebaseService.requestPermission();
    this.firebaseService.currentMessage.subscribe(token => {
      if (token) {
        // Call backend API to send notification
        console.log(token);

        this.notificationService.sendNotification(token).subscribe(response => {
          console.log('Notification sent: ', response);
        });
      }
    });
  }
}