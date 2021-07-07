import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service';
import { userModal } from '../modal/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

userform !:FormGroup;
 userList:any;
 showAdd !:boolean;
showUpdate !:boolean;
showForm !:boolean;
showBack !:boolean;
showView !:boolean;


userModalObj:userModal=new userModal();
  constructor(private fb:FormBuilder, private _userService:UserService) { }

  ngOnInit(): void {
    this.showForm=true;
    this.userform=this.fb.group({
      firstName:[""],
      lastName:[""],
      email:[""],
      mobile:[""],
      salary:[""],
        })
    this.getUserList();
  }

getUserList()
{
  this._userService.getUser().subscribe( (res:any)=>{
    this.userList=res;
    console.log(res);
  })
}
deleteUserById(x:number)
{
  this._userService.deleteUser(x).subscribe( res=>{
    console.log(res);
    alert(`Do you want to Delete id number ${x} ?`);
    this.getUserList();
  })
}

showAddEmployee()
{
  
  this.showForm=false;
  this.showAdd=true;
  this.showUpdate=false;
  this.showBack=true;
  this.userList.reset(); 
   
  
}
showUserList()
{
  this.showForm=true;
  
}

postUser()
{
  this.userModalObj.firstName=this.userform.value.firstName;
  this.userModalObj.lastName=this.userform.value.lastName;
  this.userModalObj.email=this.userform.value.email;
  this.userModalObj.mobile=this.userform.value.mobile;
  this.userModalObj.salary=this.userform.value.salary;

  this._userService.postUser(this.userModalObj).subscribe(res=>
    {
     
      console.log(res);
      alert(`Do you want to Post user?`);
      
      this.showForm=true;
      this.userList.reset();
      
      this.getUserList();
      
      
    })
}

editUser(x:any)
{
  this.showForm=false;
  this.showAdd=false;
  this.showUpdate=true;
  this.showBack=true;
  this.userModalObj.id=x.id;
  this.userform.controls['firstName'].setValue(x.firstName);
  this.userform.controls['lastName'].setValue(x.lastName);
  this.userform.controls['email'].setValue(x.email);
  this.userform.controls['mobile'].setValue(x.mobile);
  this.userform.controls['salary'].setValue(x.salary);
}

updateUser()
{
  this.userModalObj.firstName=this.userform.value.firstName;
  this.userModalObj.lastName=this.userform.value.lastName;
  this.userModalObj.email=this.userform.value.email;
  this.userModalObj.mobile=this.userform.value.mobile;
  this.userModalObj.salary=this.userform.value.salary;

  this._userService.updateUser(this.userModalObj).subscribe(res=>{
    console.log(res);
    alert(`Do you want to Update User Data?`);
    this.showForm=true;
    this.userList.reset();
      
      this.getUserList();
  })
}
first:string='';

viewUser(x:any)
{
  this.showView=true;
  this.userform.controls['firstName'].setValue(x.firstName);
  this.userform.controls['lastName'].setValue(x.lastName);
  this.userform.controls['email'].setValue(x.email);
  this.userform.controls['mobile'].setValue(x.mobile);
  this.userform.controls['salary'].setValue(x.salary);

}

}
