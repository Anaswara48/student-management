import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!: FormGroup;
  constructor(private fs: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginform = this.fs.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
      })
      if(user) {
        alert("sucessfully logged in");
        this.loginform.reset();
        this.router.navigate(['student'])
      }else {
        alert("user not found");
      }
    }, err => {
        alert("something went wrong")
      })
  }
}

