import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { RegisterComponent } from './FrontOffice/register/register.component';
import { ForbiddenComponent } from './FrontOffice/forbidden/forbidden.component';
import { AuthGuard } from './serives/Auths-Last/auth.guard';
import { UserComponent } from './FrontOffice/user/user.component';
import { StatsComponent } from './BackOffice/stats/stats.component';

const routes: Routes = [
  {
    path:"forbiden",
    component:ForbiddenComponent
  },
 { path:"",
  component:HomeFrontComponent,
  children:[

  ]
 },

{
  path:"admin",
  component:AllTemplateBackComponent , canActivate:[AuthGuard],data:{roles:['ADMIN']}
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"register",
  component:RegisterComponent
},
{
path:"user",
component:UserComponent , canActivate:[AuthGuard],data:{roles:['USER']}
},
{
  path:"stats",
  component:StatsComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
