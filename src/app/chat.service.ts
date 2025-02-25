import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private channel: BroadcastChannel;
  private messagesSubject: Subject<{ user: string, text: string, time: string }> = new Subject<{ user: string, text: string, time: string }>();
  private messagesArray: { user: string, text: string, time: string }[] = [];

  public messages: Observable<{ user: string, text: string, time: string }> = this.messagesSubject.asObservable();

  constructor() {
    this.channel = new BroadcastChannel('swoyochat_channel');

    this.channel.onmessage = (event) => {
      const message = event.data;
      this.messagesArray.push(message);
      this.messagesSubject.next(message);
    };

    setInterval(() => {
      localStorage.setItem('chatMessages', JSON.stringify(this.messagesArray));
    }, 1000);
  }

  sendMessage(message: { user: string, text: string, time: string }) {
    this.channel.postMessage(message);
    this.messagesArray.push(message);
  }
}
