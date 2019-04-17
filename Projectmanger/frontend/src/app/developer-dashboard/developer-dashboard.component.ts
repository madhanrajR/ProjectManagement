import { Component, OnInit } from '@angular/core';
import { ProjectmanagerService } from '../projectmanager.service';
import { HttpClient }    from '@angular/common/http';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.css']
})
export class DeveloperDashboardComponent implements OnInit {
    projectdetails: Array<any> = new Array();
    projectdetails1: Array<any> = new Array();
    public username:string;
    selectedFile: File = null;
    fd = new FormData();
    public mydp:string;
    public project_list:boolean=false;
    public url="http://10.10.4.141:3000/api";
    public opn:boolean=false;
    public opn1:boolean=false;
    public success:boolean=false;
    public failed:boolean=false;
    public wokhors:string;
  constructor(private project:ProjectmanagerService,private http:HttpClient) 
  { 
    this.username=sessionStorage.getItem('username')
    this.project_details();
  }

  ngOnInit() {
      
    this.mydp=sessionStorage.getItem('userid');
    $(document).ready(function () {
      console.log('front');
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
                      // Add the `invalid-feedback` class to the error elementuserid
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

  photo(event){
    console.log(event,"srirampt=hto")
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.project.images(this.fd)
    location.reload();

}
projectlist()
{
   
   this.project_list=true;

   this.project_details();
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

 status(project)
 {
     console.log(project)
     var self=this;
     self.projectdetails1=[];
     var userid=sessionStorage.getItem('userid')
     var projectid=project.projectid;
     var projectname=project.projectname;
     sessionStorage.setItem('productid',projectid)
     console.log(projectid,userid,projectname);
     var obj={
        user:userid,
        project:projectid
     }
    return this.http.post(this.url+'/trackprojects/newTrack',obj).subscribe(res=>{
        console.log(res)
        if(res['message']=='True')
        {
          this.opn=true;
          this.opn1=false;
          var temp=res['data'][0]
          console.log(temp)
     
    
         self.projectdetails1.push(
                     {
                         projectid:temp['project'],
                         projecttime:temp['recorddate'],
                         description:temp['userDescription'],
                         objectid:temp['_id'],
                         date:temp['date'],
                         usersid:temp['user'],
                         projectname:projectname
                     } 
         )
      console.log(self.projectdetails1);
      
        }
        else
        {
            this.opn=false;
            this.opn1=true;
        }
    })
   
 }

 save(a,b){
    this.success=false;
    this.failed=false;
     var user=sessionStorage.getItem('userid');
     var project=sessionStorage.getItem('productid');
     
     var obj=
     {
        userID :user,
        projectID :project,
        recorddate : a,
        userDescription : b,
     }
    return this.http.post(this.url+'/trackprojects/newtracksave',obj).subscribe(res=>{
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


 update(a){
    this.success=false;
    this.failed=false;
     console.log(a['objectid'])
     var description = (document.getElementById("description") as HTMLInputElement).value ;
     var Workinghours = (document.getElementById("Workinghours") as HTMLInputElement).value;
     console.log(description,Workinghours,"descript","working")
 var update ={     
    recorddate: Workinghours,
    userDescription: description 
}
console.log(update,"Mytextbox")
     return this.http.post(this.url+'/trackprojects/newtrackupdate/'+a['objectid'],update).subscribe(res=>{
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
}
