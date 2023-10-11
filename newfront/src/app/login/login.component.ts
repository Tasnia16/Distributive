import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  email: string = '';
  password: string = '';
  isLogin: boolean = true;
  erroMessage: string = "";
  constructor(private router: Router,private http: HttpClient,private sharedService:SharedServiceService) {}
  login() {
    console.log(this.email);
    console.log(this.password);
    let bodyData = {
      email: this.email,
      password: this.password,
    };

    //http://localhost:9000/routes/user/login
        this.http.post("http://localhost/api/user/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);
        if (resultData.status)         //ekhan theke mail store
        {


          this.sharedService.setUserEmail(bodyData.email);
          console.log("hihi");
          
             console.log(bodyData.email);
          // this.router.navigateByUrl('/home');
          this.router.navigate(["dashboard"]);
    
        } 
        else
         {
          alert("Incorrect Email or Password");
          console.log("Errror login");
        }
      });
    }
}