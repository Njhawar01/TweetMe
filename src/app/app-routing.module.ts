import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user-module/register/register.component';
import { LoginComponent } from './user-module/login/login.component';
import { HomeComponent } from './user-module/home/home.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { AllUsersComponent } from './user-module/all-users/all-users.component';
import { ForgotPasswordComponent } from './user-module/forgot-password/forgot-password.component';
import { AllTweetsComponent } from './tweet-module/all-tweets/all-tweets.component';
import { UserHandleComponent } from './user-module/user-handle/user-handle.component';
import { PageNotFoundComponent } from './shared/error-pages/page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './shared/error-pages/internal-server-error/internal-server-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LoginComponent },
  { path: 'all-users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'all-tweets', component: AllTweetsComponent, canActivate: [AuthGuard]},
  { path: 'user/:username', component: UserHandleComponent, canActivate: [AuthGuard] },
  { path: 'error/500', component: InternalServerErrorComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
