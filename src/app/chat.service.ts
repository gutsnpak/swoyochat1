import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket;
  private messagesSubject: Subject<{ user: string, text: string, time: string }> = new Subject<{ user: string, text: string, time: string }>();

  public messages: Observable<{ user: string, text: string, time: string }> = this.messagesSubject.asObservable();

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messagesSubject.next(message);
    };
  }

  sendMessage(message: { user: string, text: string, time: string }) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
}
