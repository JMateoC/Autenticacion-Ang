import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupaService } from 'src/app/service/supa.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: SupaService, private router: Router) {
    this.loginForm = formBuilder.group({
      email: formBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  public onSubmit(): void {
    this.auth
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        console.log(res);
        if(res.data.user!.role === 'authenticated') {
          this.router.navigate(['/dashboard'])
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
