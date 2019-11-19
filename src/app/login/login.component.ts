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
    this.service.login(this.loginForm.value).subscribe(data=>{data.forEach(element=>{
      console.log(element["l_id"])
      localStorage.setItem('user',element["Username"]);
      if (element["l_id"]==1) {
        this.router.navigateByUrl('/list');
        
      }
      else {
        this.toastr.warning("Invalid username and password");
      }
  
  
    });
  })
} 
}
