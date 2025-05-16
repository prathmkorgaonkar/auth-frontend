import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form = { name: '', email: '', password: '', mobile: '' }; // ✅ use `mobile` instead of `mobileNumber`

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.form).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error.message)
    });
  }
}
