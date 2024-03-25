import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticationService } from 'src/app/serives/authentication.service';
import { Router } from '@angular/router';
import { VerificationRequest } from '../models/verification-request';
import { Role } from '../models/Role';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Make sure to initialize 'role' property with an appropriate value
  registerRequest: RegisterRequest = {
    roles: [] // Assuming 'role' is an array of roles, initialize it as empty array
  };

  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';
  roles: string[] = ['USER', 'MEDECIN', 'AMBILANCIER', 'INFERMIER', 'PATIENT', 'VISITEUR', 'ADMIN', 'DONATEUR', 'HOMELESS', 'ORGANISATEUR','CUISINIER'];
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }
   roleChosing!:any;

  registerUser() {
    this.roleChosing= this.registerRequest.roles;
    const role1: Role = {
      name: this.roleChosing
  };
    this.registerRequest.roles = [];
    this.registerRequest.roles.push(role1);

    this.message = '';
    console.log(this.registerRequest);
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
          } else {
            // inform the user
            this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000)
          }
        }
      });

  }

  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the login page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.token as string);
            this.router.navigate(['welcome']);
          }, 30);
        }
      });
  }
  addForm =new FormControl({
    


  })
}
