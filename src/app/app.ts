import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true
})
export class App implements OnInit {
  title = 'angular-ekart';
  private secretSequence: string[] = [];
  private readonly KONAMI_CODE = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    private router: Router
  ) {}

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.secretSequence.push(event.key);
    this.secretSequence = this.secretSequence.slice(-4); // Track last 4 inputs

  if (JSON.stringify(this.secretSequence) === JSON.stringify(this.KONAMI_CODE)) {
      this.navigateToAdmin();
    }
  }

  private navigateToAdmin() {
    const user = this.auth.getUser();
    const isAdmin = this.profile.getProfile()?.role === 'ADMIN';

    if (user?.email === 'hb718107@gmail.com' && isAdmin) {
      console.log('ADMIN ACCESS: Authorized. Navigating to Dashboard...');
      this.router.navigate(['/admin']);
    } else {
      console.warn('ADMIN ACCESS: Identity Check Failed. Access Denied.');
    }
    
    this.secretSequence = []; // Clear sequence
  }

  ngOnInit() {
    this.profile.isComplete$.subscribe(complete => {
      const user = this.auth.getUser();
      // If logged in but incomplete, force to auth page
      if (user && !complete && !this.router.url.includes('/auth')) {
        this.router.navigate(['/auth']);
      }
    });
  }
}
