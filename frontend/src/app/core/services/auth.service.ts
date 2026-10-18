
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  private readonly storageKey = 'smartstock_session';

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          sessionStorage.setItem(
            this.storageKey,
            JSON.stringify({
              user: response.data.user,
              token: response.data.token
            })
          );
        })
      );
  }

  getToken(): string | null {
    const session = this.getSession();
    return session?.token ?? null;
  }

  getCurrentUser(): AuthUser | null {
    const session = this.getSession();
    return session?.user ?? null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  private getSession(): {
    user: AuthUser;
    token: string;
  } | null {
    const storedSession = sessionStorage.getItem(this.storageKey);

    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as {
        user: AuthUser;
        token: string;
      };
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}

