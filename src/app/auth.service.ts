import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameKey = 'chatUsername';

  setUsername(username: string) {
    if (typeof username === "string" && username.trim()) {
      localStorage.setItem(this.usernameKey, username);
    }
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
 clearUsername() {
    localStorage.removeItem(this.usernameKey);
  }
}
