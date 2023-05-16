import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

signupform!:FormGroup

  constructor(private fs:FormBuilder, private http:HttpClient,private router:Router){}

ngOnInit():void{
  this.signupform = this.fs.group({
name:['',Validators.required],
email:['',Validators.required],
mobile:['',Validators.required],
password:['',Validators.required],
  })
}

signup(){
this.http.post(" http://localhost:3000/signup",this.signupform.value).subscribe(res=>{
  alert("student registered successfully");
  this.signupform.reset();
  this.router.navigate(['login'])

},
err=>{
alert("something went wrong")
})
}
}
