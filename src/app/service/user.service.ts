import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl:string=" http://localhost:4000/posts";
  constructor(private _http:HttpClient) { }

getUser()
{
  return this._http.get(this.apiUrl);
}
getUserById(id:number)
{
  const api=`${this.apiUrl}/${id}`
  return this._http.get(api);
}
deleteUser(id:number)
{
  const api=`${this.apiUrl}/${id}`
  return this._http.delete(api);
}
postUser(data:any){
  return this._http.post(this.apiUrl,data);
}
updateUser(data:any)
{
  
  return this._http.put(this.apiUrl,data);
}

}
