import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  loading = false;
  error: string | null = null;
  isLoggedIn = false;
  isProfileIncomplete = false;

  // Form fields
  email = '';
  password = '';
  phone = '';
  address = '';
  billingInfo = '';

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.email = user.email || '';
      }
    });

    this.profile.isComplete$.subscribe(complete => {
      if (this.isLoggedIn) {
        this.isProfileIncomplete = !complete;
        
        // Auto-fill existing profile data if any
        const currentProfile = this.profile.getProfile();
        if (currentProfile) {
          this.phone = currentProfile.phone || '';
          this.address = currentProfile.address || '';
          this.billingInfo = currentProfile.billing_info || '';
        }
      } else {
        this.isProfileIncomplete = false;
      }
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  async handleGoogleLogin() {
    this.loading = true;
    try {
      await this.auth.signInWithGoogle();
    } catch (err: any) {
      this.error = err.message;
      this.loading = false;
    }
  }

  async completeProfile() {
    if (!this.phone || !this.address) {
      this.error = "Deployment Coordinates (Phone & Address) are mandatory.";
      return;
    }

    this.loading = true;
    try {
      await this.profile.updateProfile({
        phone: this.phone,
        address: this.address,
        billing_info: this.billingInfo
      });
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async handleSubmit() {
    this.loading = true;
    this.error = null;

    try {
      if (this.isLoginMode) {
        await this.auth.signIn(this.email, this.password);
        // Navigation handled by the isComplete$ subscription redirect or manual
        if (!this.isProfileIncomplete) {
            this.router.navigate(['/']);
        }
      } else {
        const metadata = {
          phone: this.phone,
          address: this.address,
          billing_info: this.billingInfo
        };
        await this.auth.signUp(this.email, this.password, metadata);
        this.error = "Account created successfully. Please check your email for verification before logging in.";
        this.isLoginMode = true;
      }
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
