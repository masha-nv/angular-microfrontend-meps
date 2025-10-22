import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserDatabase } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private http = inject(HttpClient);

  login(
    userId: string,
    password: string
  ): Observable<{ success: boolean; user?: User; error?: string }> {
    return this.http.get<UserDatabase>('/assets/users.json').pipe(
      map((users) => {
        const user = users[userId];

        if (!user) {
          return { success: false, error: 'User not found' };
        }

        if (password === 'password' || password === userId) {
          this.currentUserSubject.next(user);
          return { success: true, user };
        }

        return { success: false, error: 'Invalid password' };
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
