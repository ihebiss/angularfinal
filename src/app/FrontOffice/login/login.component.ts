import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticationService } from 'src/app/serives/authentication.service';
import { VerificationRequest } from '../models/verification-request';
import { UserAuthServiceService } from 'src/app/serives/auth/user-auth-service.service';
import { Medecin } from '../models/Medecin';
import { Patient } from '../models/Patient';
import { Cuisinier } from '../models/Cuisinier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userAuthServiceService : UserAuthServiceService
  ) {
  }
  ngOnInit(): void {

  }
  current_User:any;
  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
  
          
          this.userAuthServiceService.setRoles((response as any).user.roles);
          this.userAuthServiceService.setToken(response.token!);
          const role = String((response as any).user.roles[0].name);
          const iduserlogedIn = (response as any).user.id;
          this.authService.getCurrentUsersWithRole(iduserlogedIn,role)
          .subscribe({
            next: (response) => {
              this.current_User=response;
           
            }
          });
          console.log(role);
          
          switch (role) {
            case 'ADMIN':
              this.router.navigate(['/admin']);

              
              break;
            case 'MEDECIN':
              console.log("pskkk");
              const med: Medecin = {
                idMedecin: this.current_User.idMedecin,
                disponible: this.current_User.disponible,
                user: this.current_User.user
            };
            localStorage.setItem('MEDECIN',JSON.stringify(med));  
              this.router.navigate(['/']);
              break;
            case 'AMBILANCIER':
              this.router.navigate(['/']);

              break;
            case 'INFERMIER':
              this.router.navigate(['/']);
              break;
            case 'PATIENT':
             const pas: Patient ={
              idpatient: this.current_User.idpatient,
              user:this.current_User.user,
              typePatient: this.current_User.typePatient,
              archiver: this.current_User.archiver,
              poid :this.current_User.poid,
              longueur:this.current_User.longueur,
              sexe:this.current_User.sexe,
              dateDeNaissance:this.current_User.dateDeNaissance
          }
          localStorage.setItem('Patient',JSON.stringify(pas));  
              this.router.navigate(['/']);
              
              break;
            case 'VISITEUR':
              this.router.navigate(['/']);
              break;
            case 'DONATEUR':
              this.router.navigate(['/']);
              break;
            case 'HOMELESS':
              this.router.navigate(['/']);
              break;
            case 'ORGANISATEUR':
              this.router.navigate(['/']);
              break;
              case 'CUISINIER':
                console.log("jbfjebflblebflekbflkeb")
                const cui: Cuisinier = {
                  
                  idC:this.current_User.idC,
                  nom:this.current_User.nom,
                 prenom: this.current_User.prenom,
                 dateAjout:this.current_User.dateAjout, 
                 sexe:this.current_User.sexe,
                 salaire:this.current_User.salaire,
                 disponiblee:this.current_User.disponiblee,
                 user: this.current_User.user
              };
              console.log("jbfjebflblebflekbflkebffffffffff")
              localStorage.setItem('CUISINIER',JSON.stringify(cui));
                this.router.navigate(['/']);
                break;
            default:
              this.router.navigate(['/']);
              break;
          }
         
        /*  this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.token as string);
            this.router.navigate(['welcome']);
          }*/
        }
      });
  }


  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token as string);
          this.router.navigate(['welcome']);
        }
      });
  }
}