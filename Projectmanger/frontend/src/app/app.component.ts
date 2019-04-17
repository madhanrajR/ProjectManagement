import { Component } from '@angular/core';
import { ProjectmanagerService } from './projectmanager.service';
import { Router } from '@angular/router';
import { HttpClient }    from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private project:ProjectmanagerService,private myRoute:Router) { 
    
  }
  title = 'projectmanager';
}
