import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: { user: string, text: string, time: string }[] = [];
  newMessage: string = '';
  username: string = '';

constructor(private chatService: ChatService, protected authService: AuthService) {}
    ngOnInit() {

  this.loadMessages();
  this.authService.clearUsername();
    const storedUsername = this.authService.getUsername();
    if (storedUsername) {
      this.username = storedUsername;
    }
    this.chatService.messages.subscribe((message: { user: string, text: string, time: string}) => {
      this.messages.push(message);
      this.saveMessages();
    });
  }

   sendMessage() {
    if (this.newMessage.trim() && this.username) {
      const message = { user: this.username, text: this.newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      this.chatService.sendMessage(message);
      this.messages.push(message);
      this.saveMessages();
      this.newMessage = '';
    }
  }

  saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }
    login() {
    if (this.username && this.username.trim()) {
      this.authService.setUsername(this.username);
    }
  }
}
