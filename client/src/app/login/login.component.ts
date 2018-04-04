import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    
   }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onLogin() {
    this.loginService.login(this.loginform.get('email'), this.loginform.get('password')).subscribe(res => {
      if (res.status) {
        localStorage.setItem('token', res.data);
        this.router.navigate(['/admin']);

      } else {
        window.alert('Login Failed');
      }
    });
  }
}
