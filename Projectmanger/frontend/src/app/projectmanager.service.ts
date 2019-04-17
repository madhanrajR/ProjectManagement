import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient }    from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectmanagerService {
public admin :boolean=false;
public developer :boolean=false;
public status :boolean=false;
public success:boolean=false;
    public failed:boolean=false;
public url="http://10.10.4.141:3000/api";
  constructor(private myRoute:Router,private http:HttpClient) { }
admin1(userid,password)
{
  this.success=false;
    this.failed=false;
 console.log(userid,password)
    const obj={
      userID:userid,
      password:password
    }
   console.log(obj)
    return this.http.post(this.url+'/user/login',obj).subscribe(res=>{
      var temp=res;
      console.log(temp['message'])
      // console.log(tempmessage);
      this.success=true;
    if(temp['message']==='admin')
    {
      this.myRoute.navigate(["Admin"]);
      sessionStorage.setItem('token',temp['token'])
      sessionStorage.setItem('username',temp['name'])
      sessionStorage.setItem('userid',temp['userid'])
      sessionStorage.setItem('route','admin')
      sessionStorage.setItem('status','true')
      this.admin=true
      this.status=true;
    }
    else
    {
     this.myRoute.navigate(["Developer"]);
      sessionStorage.setItem('token',temp['token'])
      sessionStorage.setItem('username',temp['name'])
      sessionStorage.setItem('userid',temp['userid'])
      sessionStorage.setItem('route','developer')
      sessionStorage.setItem('status','true')
      this.developer=true
      this.status=true;
    }
    },
    err=>
    {
     this.failed=true;
  console.log(err)
    })

}
getToken() {
  return sessionStorage.getItem("userid")
}
isLoggednIn() {
 // console.log(this.getToken()!==null);
  
  return this.getToken() !== null;
}
psubmit(projectid,projectname,projectdetail)
{
  console.log(projectid,projectname,projectdetail)
  const obj={
    projectID:projectid,
    projectTitle:projectname,
    projectDescription:projectdetail
  }
 console.log(obj)
  return this.http.post(this.url+'/project/newproject',obj).subscribe(res=>{
    var temp=res;
    console.log(temp)
  },
  err=>
  {
console.log(err)
  })
}
developer1()
{
this.developer=true;
}

images(data){
  var userid = sessionStorage.getItem('userid');
  console.log(data,"RService")
  this.http.post(this.url+'/user/uploadimage/'+userid,data)
  .subscribe( result => {
    console.log(result)
    // setTimeout(()=>{
    //   // this.myRoute.navigate(["Admin"]);
    //   location.reload();
    // },5000)
  },
  err=>{
    console.log(err.error.text,"MYError")
 
    // setTimeout(()=>{
    //   // this.myRoute.navigate(["Admin"]);
    //   location.reload();
    // },5000)
  });
 
 }
logout()
{
  this.admin=false;
  this.developer=false;
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('route');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('userid');
  sessionStorage.removeItem('productid');
  sessionStorage.removeItem('status');
  this.myRoute.navigate(["login"]);
  this.status=false;
}
// check(){
//   setInterval(()=>{
//     if(sessionStorage.getItem('status')!="true" ||sessionStorage.getItem('status')=="" || sessionStorage.getItem('status')=="false"){
//       this.myRoute.navigate(["Admin"]);
//     }
    
//   },100);
// }
}
