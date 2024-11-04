import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api/notifications/send';  // Adjust the API URL

  constructor(private http: HttpClient) { }

  // Call the backend to send notification
  sendNotification(token: any) {
    return this.http.get(`${this.apiUrl}?token=${token}`);
  }
}
