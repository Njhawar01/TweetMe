import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { JwtModule } from "@auth0/angular-jwt";
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { UserService } from './core/services/user.service';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './tweet-module/filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternalServerErrorComponent } from './shared/error-pages/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './shared/error-pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { AllTweetsComponent } from './tweet-module/all-tweets/all-tweets.component';
import { AllUsersComponent } from './user-module/all-users/all-users.component';
import { ForgotPasswordComponent } from './user-module/forgot-password/forgot-password.component';
import { HomeComponent } from './user-module/home/home.component';
import { LoginComponent } from './user-module/login/login.component';
import { RegisterComponent } from './user-module/register/register.component';
import { UserHandleComponent } from './user-module/user-handle/user-handle.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { NgxSpinnerModule } from "ngx-spinner";

export function tokenGetter() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.token;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AllUsersComponent,
    ForgotPasswordComponent,
    AllTweetsComponent,
    FilterPipe,
    UserHandleComponent,
    PageNotFoundComponent,
    InternalServerErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:38201"],
        disallowedRoutes: []
      }
    }),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
