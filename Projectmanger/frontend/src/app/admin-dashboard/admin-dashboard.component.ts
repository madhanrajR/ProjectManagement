import { Component, OnInit } from '@angular/core';
import { ProjectmanagerService } from '../projectmanager.service';
import { HttpClient }from '@angular/common/http';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    projectdetails: Array<any> = new Array();
    projectdetails1: Array<any> = new Array();
    developerdetails: Array<any> = new Array();
    developerdetails1: Array<any> = new Array();
    public add_project:boolean=false;
    public add_developer:boolean=false;
    public project_list:boolean=false;
    public developer_list:boolean=false;
    public developer_list1:boolean=false;
    public success:boolean=false;
    public failed:boolean=false;
    public showtable:boolean=false;
    public projectname;
    public url="http://10.10.4.141:3000/api";
    public username:string;
    selectedFile: File = null;
fd = new FormData();
public mydp:string;
public picture:boolean=false;
public picture1:boolean=false;
  constructor(private project:ProjectmanagerService,private http:HttpClient) {
      this.project_details();
      this.developer_details();
      this.username=sessionStorage.getItem('username')
   }

  ngOnInit() {
      this.mydp=sessionStorage.getItem('userid');
    $(document).ready(function () {
      console.log('front')

      $("#myphoto").click(function(){
        //  alert("hai")
         $("#changedp").trigger('click');
        // changedp
        })
          // ------------------------------------------------------- //
          // Custom Scrollbar
          // ------------------------------------------------------ //
      
          if ($(window).outerWidth() > 992) {
              $("nav.side-navbar").mCustomScrollbar({
                  scrollInertia: 200
              });
          }
      
          // Main Template Color
          var brandPrimary = '#33b35a';
      
          // ------------------------------------------------------- //
          // Side Navbar Functionality
          // ------------------------------------------------------ //
          $('#toggle-btn').on('click', function (e) {
      
              e.preventDefault();
      
              if ($(window).outerWidth() > 1194) {
                  $('nav.side-navbar').toggleClass('shrink');
                  $('.page').toggleClass('active');
              } else {
                  $('nav.side-navbar').toggleClass('show-sm');
                  $('.page').toggleClass('active-sm');
              }
          });
      
          // ------------------------------------------------------- //
          // Tooltips init
          // ------------------------------------------------------ //    
      
          $('[data-toggle="tooltip"]').tooltip()
      
          // ------------------------------------------------------- //
          // Universal Form Validation
          // ------------------------------------------------------ //
      
          $('.form-validate').each(function() {  
              $(this).validate({
                  errorElement: "div",
                  errorClass: 'is-invalid',
                  validClass: 'is-valid',
                  ignore: ':hidden:not(.summernote),.note-editable.card-block',
                  errorPlacement: function (error, element) {
                      // Add the `invalid-feedback` class to the error element
                      error.addClass("invalid-feedback");
                      //console.log(element);
                      if (element.prop("type") === "checkbox") {
                          error.insertAfter(element.siblings("label"));
                      } 
                      else {
                          error.insertAfter(element);
                      }
                  }
              });
          });
          // ------------------------------------------------------- //
          // Material Inputs
          // ------------------------------------------------------ //
      
          var materialInputs = $('input.input-material');
      
          // activate labels for prefilled values
          materialInputs.filter(function () {
              return $(this).val() !== "";
          }).siblings('.label-material').addClass('active');
      
          // move label on focus
          materialInputs.on('focus', function () {
              $(this).siblings('.label-material').addClass('active');
          });
      
          // remove/keep label on blur
          materialInputs.on('blur', function () {
              $(this).siblings('.label-material').removeClass('active');
      
              if ($(this).val() !== '') {
                  $(this).siblings('.label-material').addClass('active');
              } else {
                  $(this).siblings('.label-material').removeClass('active');
              }
          });
      
          // ------------------------------------------------------- //
          // Jquery Progress Circle
          // ------------------------------------------------------ //
          var progress_circle = $("#progress-circle").gmpc({
              color: brandPrimary,
              line_width: 5,
              percent: 80
          });
          progress_circle.gmpc('animate', 80, 3000);
      
          // ------------------------------------------------------- //
          // External links to new window
          // ------------------------------------------------------ //
      
          $('.external').on('click', function (e) {
      
              e.preventDefault();
              window.open($(this).attr("href"));
          });
      
          // ------------------------------------------------------ //
          // For demo purposes, can be deleted
          // ------------------------------------------------------ //
      
          var stylesheet = $('link#theme-stylesheet');
          $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
          var alternateColour = $('link#new-stylesheet');
      
          if ($.cookie("theme_csspath")) {
              alternateColour.attr("href", $.cookie("theme_csspath"));
          }
      
          $("#colour").change(function () {
      
              if ($(this).val() !== '') {
      
                  var theme_csspath = 'css/style.' + $(this).val() + '.css';
      
                  alternateColour.attr("href", theme_csspath);
      
                  $.cookie("theme_csspath", theme_csspath, {
                      expires: 365,
                      path: document.URL.substr(0, document.URL.lastIndexOf('/'))
                  });
      
              }
      
              return false;
          });
          
         
      
      });

  
      
  }

  dragging(){
    $("#myModal3").modal("show")
     }

  addproject()
  {
      this.add_developer=false;
this.add_project=true;
this.project_list=false;
this.developer_list=false;
this.developer_list1=false;
this.showtable=false;


  }
  projectsubmit(projectid,projectname,projectdetail)
  {
    this.success=false;
    this.failed=false;
   //this.project.psubmit(projectid,projectname,projectdetail);
   const obj={
    projectID:projectid,
    projectTitle:projectname,
    projectDescription:projectdetail
  }
 console.log(obj)
  return this.http.post(this.url+'/project/newproject',obj).subscribe(res=>{
    var temp=res;
    console.log(temp)
    if(res)
       {
this.success=true;
       }
       else{
        this.failed=true;
       }
  },
  err=>
  {
console.log(err)
this.failed=true;
  })
  }
  projectcancel()
  {
    this.add_project=false;
  }
 adddeveloper()
 {
     this.add_project=false;
this.add_developer=true;
this.project_list=false;
this.developer_list=false;
this.developer_list1=false;
this.showtable=false;

 }
 Developersubmit(devname,devid,devpwd)
 {
    this.success=false;
    this.failed=false;
     console.log(devname,devid,devpwd);
     
    const obj={
         userID:devid,
        password:devpwd,
        roles: "developer",
        username:devname
      }
    return this.http.post(this.url+'/user/signup',obj).subscribe(res=>{
       console.log(res)
       if(res)
       {
this.success=true;
       }
       else{
        this.failed=true;
       }
  },
  err=>
  {
console.log(err)
this.failed=true;
  })
 }
 projectlist()
 {
    this.add_project=false;
    this.add_developer=false;
    this.project_list=true;
    this.developer_list=false;
    this.developer_list1=false;
    this.showtable=false;
    this.project_details();
 }
 developerlist()
 {
    this.add_project=false;
    this.add_developer=false;
    this.project_list=false;
    this.developer_list=true;
    this.developer_list1=false;
    this.showtable=false;
    this.developer_details();
 }
 developercancel()
 {
    this.add_developer=false;
 }
 project_details()
 {
  var self=this; 
  self.projectdetails=[];
return this.http.get(this.url+'/project').subscribe(res=>{
    var temp=res['projects'];
     //console.log(temp)

temp.forEach(function(item,value){
     console.log(item,value)
    self.projectdetails.push(
                {
                    projectname:item['projectTitle'],
                    projectdetails:item['projectDescription'],
                    projectid:item['projectID']
                } 
    )
  });
    })
   
 }

 developer_details()
 {
  var self=this; 
  self.developerdetails=[];
return this.http.get(this.url+'/user/getdeveloperlist').subscribe(res=>{
    var temp=res['message'];
     console.log(temp)

temp.forEach(function(item,value){
     console.log(item,value)
    
     self.developerdetails.push(
        {
            roles: item["roles"],
           userID: item["userID"],
          username: item["username"]
        } 
)
  });
    })
   
 }

 photo(event){
    console.log(event,"srirampt=hto")
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.project.images(this.fd)
    location.reload();

}
viewdeveloper(a){
    this.add_project=false;
    this.add_developer=false;
    this.project_list=false;
    this.developer_list=false;
    this.showtable=false;
    var userarray=[];
    this.projectname=a['projectname']
    console.log(a)
    console.log(a['projectid'],this.projectname)
    return this.http.get(this.url+'/trackprojects/userproject/'+a['projectid']).subscribe(res=>{
        console.log(res['trackProjects']);
var temp=res['trackProjects'];
temp.map((key,value) => {
console.log(key['doc'])

    userarray.push(key['doc']["user"])

})
let x = (userarray) => userarray.filter((v,i) => userarray.indexOf(v) === i)
x(userarray);
console.log(x(userarray),'x')
console.log(userarray,'user');

this.usercall(x(userarray),a['projectid']);
})
}
usercall(x,a)
{
    console.log(x,a)
    this.developerdetails1=[];
    x.map((key1,value) => {
        console.log(key1,'key1')
        var obj={
            userID:key1
        }
        return this.http.post(this.url+'/user/getsingeldeveloper',obj).subscribe(res=>{
            var temp=res['message'];
            console.log(temp)
            this.developerdetails1.push(
                {
                    roles: temp[0]["roles"],
                   userID: temp[0]["userID"],
                  username: temp[0]["username"],
                  projectID:a
                } )
                console.log(this.developerdetails1)
        this.developer_list1=true;
        })
        
    })
}

viewstatus(project)
{
    console.log(project)
    this.showtable=true;
    // this.add_project=false;
    // this.add_developer=false;
    // this.project_list=false;
    // this.developer_list=false;
    // this.showtable=false;
    this.developer_list1=false;
    var projectname=project.projectname;
    this.projectdetails1=[];
    console.log(project);
    var obj={
        userid:project['userID'],
        projectid:project['projectID']
    }
    return this.http.post(this.url+'/trackprojects/no_of_users_in_project',obj).subscribe(res=>{
        var temp=res['trackProjects'];
temp.map((key,value) => {
console.log(key['doc'])
this.projectdetails1.push(
    {
        Workinghours:key['doc']['recorddate'],
        projectdetails:key['doc']['userDescription'],
        projectid:key['doc']['project'],
        Statusdate:key['doc']['date'],
        projectname:this.projectname
    } 
)
   

})
        
    })
}
}
