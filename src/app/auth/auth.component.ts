import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // show/hide password
  showPassword = signal(false);
  serverError = signal<string | null>(null);
  loading = signal(false);

  form!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.serverError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    this.auth.login({ email: email!, password: password! }).subscribe({
      next: (res) => {
        // save token (if remember checked, persist longer)
        if (this.form.value.remember) {
          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
        // navigate to dashboard here if you have one
        // this.router.navigateByUrl('/dashboard');
        this.loading.set(false);
        alert('Logged in successfully!');
      },
      error: (err) => {
        this.loading.set(false);
        this.serverError.set(
          err?.error?.message || 'Login failed. Please try again.'
        );
      },
    });
  }
}
