import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
   //canActivate:[AuthGuard]
  },
  {
    path:'Admin',
    component:AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'Developer',
    component:DeveloperDashboardComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    DeveloperDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
