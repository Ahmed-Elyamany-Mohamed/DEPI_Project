import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, of } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {   
  token: string;
  user: { id: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Replace with your real API base URL
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // Demo: fake request (use http.post in real app)
  login(payload: LoginPayload) {
    // return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload);
    return of({
      token: 'demo.jwt.token',
      user: { id: '1', email: payload.email },
    }).pipe(delay(1000));
  }
}
