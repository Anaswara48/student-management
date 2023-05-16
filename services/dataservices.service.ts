import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataservicesService {

  constructor(private _http:HttpClient) { }

  poststudent(data:any){
    return this._http.post<any>(" http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
return res;
    }))
  }

  getstudent(){
    return this._http.get<any>("http://localhost:3000/posts/")
    .pipe(map((res:any)=>{
      return res;
          }))
  }
  updatestudent(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
          }))
  }

  deletestudent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
          }))
  }
}
