import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// material design
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthserviceService } from 'src/app/shared/utils/services/authservice.service';




@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    // common
    
    CommonModule,
    // modules
    LoginRoutingModule,
    // angular forms
    ReactiveFormsModule,
    FormsModule,
    // material design
    MatFormFieldModule,
    MatInputModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule
   
    
  ],
  providers: [AuthserviceService]
})
export class LoginModule { }
