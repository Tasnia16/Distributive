import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  posts: any[] = [];
  userMail: string = ''; // edit Define the userMail property here

  //images: string[] = [];
  

  //edit constructor and its body
  constructor(private router: Router,private http: HttpClient,private sharedService:SharedServiceService) { 
    
    this.sharedService.currentUserEmail.subscribe(email => {
      this.userMail = email;
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
    
  }


 



  fetchPosts(): void {
    const url = `http://localhost/api/post?userMail=${this.userMail}`;
    this.http.get<any>(url)
      .subscribe(
        (response) => {
          this.posts = response.otherPosts as [];

          //this.fetchImages();
        },
        (error) => {
          console.error('Error retrieving posts:', error);
        }
      );
  }


  // fetchImages(): void {


  
  //   this.posts.forEach((post) => {
  //     this.http.get('http://localhost:4002/api/v1/images/' + post.image, { responseType: 'blob' }).subscribe(
  //       (data: Blob) => {
  //         post.imageSrc = URL.createObjectURL(data);
  //       },
  //       (error) => {
  //         console.error('Error fetching image:', error);
  //       }
  //     );
  //   });

  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(["login"]);
  }

}
