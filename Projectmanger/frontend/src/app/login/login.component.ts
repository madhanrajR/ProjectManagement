import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectmanagerService } from '../projectmanager.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private myRoute:Router,private project:ProjectmanagerService
    ) { }

 
login(userid,password)
{
  console.log(userid,password)
  this.project.admin1(userid,password);
  //this.myRoute.navigate(["Admin"]);
}
ngOnInit() {
}
}
