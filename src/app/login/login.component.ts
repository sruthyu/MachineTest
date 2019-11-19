import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { Loginuser } from '../shared/loginuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  login: Loginuser = new Loginuser();

  constructor(private service: AuthService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  logins() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.toastr.warning("Invalid username and password");
    }
    else {
      this.router.navigateByUrl('/list');
    }

  }

}
