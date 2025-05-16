import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    mobile: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data) => {
        this.user = { ...data, password: '' };
      },
      error: (err) => {
        alert('Failed to load profile');
        this.router.navigate(['/login']);
      },
    });
  }

  updateProfile() {
    this.auth.updateProfile(this.user).subscribe({
      next: () => alert('Profile updated successfully'),
      error: (err) => alert(err.error.message || 'Update failed'),
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
