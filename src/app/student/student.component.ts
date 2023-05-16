import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { DataservicesService } from 'services/dataservices.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  showadd!:boolean;
  showupdate!:boolean;
studentmodelobj:studentdata=new studentdata
  formValue!:FormGroup
  allstudentdata:any
constructor(private formBuilder:FormBuilder, private dataservices:DataservicesService){

}
ngOnInit(): void{
this.formValue=this.formBuilder.group({
name:['', Validators.required],
email:['', Validators.required],
mobile:['', Validators.required],
city:['', Validators.required]

})
this.getdata()
}

add(){
this.showadd=true;
this.showupdate=false;

}
edit(data:any){
this.showadd=false;
this.showupdate=true;
this.studentmodelobj.id=data.id
this.formValue.controls['name'].setValue(data.name)
this.formValue.controls['email'].setValue(data.email)
this.formValue.controls['mobile'].setValue(data.mobile)
this.formValue.controls['city'].setValue(data.city)

}

update(){
  this.studentmodelobj.name=this.formValue.value.name;
  this.studentmodelobj.email=this.formValue.value.email;
  this.studentmodelobj.mobile=this.formValue.value.mobile;
  this.studentmodelobj.city=this.formValue.value.city;
this.dataservices.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
  this.formValue.reset()
  this.getdata()
alert("record updated successfully")
},
err=>{
  alert("something went wrong")
}
)
}

addstudent(){
  this.studentmodelobj.name=this.formValue.value.name;
  this.studentmodelobj.email=this.formValue.value.email;
  this.studentmodelobj.mobile=this.formValue.value.mobile;
  this.studentmodelobj.city=this.formValue.value.city;


this.dataservices.poststudent(this.studentmodelobj).subscribe(res=>{
console.log(res);
this.formValue.reset()
this.getdata()
  
  alert("added successfully")
},
err=>{
  alert("something went wrong!!!")
}
)
}
getdata(){
  this.dataservices.getstudent()
  .subscribe(res=>{
this.allstudentdata=res;
  })
}

deletestud(data:any){
  if(confirm("are you sure to delete?"))
  this.dataservices.deletestudent(data.id).subscribe(res=>{
    alert("record deleted successfully")
    this.getdata()
  })
}
}

