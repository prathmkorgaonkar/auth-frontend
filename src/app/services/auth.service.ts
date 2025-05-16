import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private serverUrl = environment.BACKEND_SERVER_URL;

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.serverUrl}route/user/login`, data);
  }

  // Signup method
  signup(data: { name: string; email: string; password: string; mobile: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.serverUrl}route/user/signup`, data);
  }

  // Save token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout and redirect to login
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get logged-in user's profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.serverUrl}route/user/getProfile`);
  }

  // Update logged-in user's profile
  updateProfile(data: { name: string; mobile: string; password?: string }): Observable<any> {
    return this.http.put(`${this.serverUrl}route/user/updateProfile`, data);
  }
}
