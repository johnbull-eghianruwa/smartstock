
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly authService = inject(AuthService);

  currentUser = this.authService.getCurrentUser();

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
