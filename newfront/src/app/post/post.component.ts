import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  

  post = {
    content: '',
    image:''
  };
loggedInUser: any;

userMail: string = '';
selectedFile: File | null = null;
    
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  
  constructor(private http: HttpClient, private sharedService:SharedServiceService) { 
   

    this.sharedService.currentUserEmail.subscribe(email => {
      this.userMail = email; // Get the user email from the shared service
    });


  }


  // onUpload() {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile, this.selectedFile.name);

  //     this.http.post<any>('http://localhost/api/post/images/upload', formData).subscribe(
  //       (response) => {
  //         console.log(response);
  //         alert('Photo uploaded successfully!');
  //       },
  //       (error) => {
  //         console.error(error);
  //         alert('Post uploaded successfully!');
  //       }
  //     );
  //   }

  // }
  


//http://localhost:9000/routes/post/post
  submitPost() {

    if (this.selectedFile) {

      const formData = new FormData();
      formData.append('content', this.post.content);
      formData.append('userMail',this.userMail);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      
      this.http.post<any>('http://localhost/api/post/post', formData).subscribe(
        (response) => {
          console.log(response);
          this.post.content = '';
          this.selectedFile= null;
        },
        (error) => {
          console.error(error);
        }
      );

    }
    else{

      const formData = new FormData();
      formData.append('content', this.post.content);
      formData.append('userMail',this.userMail);

      this.http.post('http://localhost/api/post/post', formData)    // header user nam mail
      .subscribe((response: any) => {
        console.log(response);
        this.post.content = '';

        // if(this.selectedFile){
        // this.onUpload();}
       // this.selectedFile='';
      });
    }




  //   const formData = new FormData();

  //  //formData.append('image', this.selectedFile, this.selectedFile.name);


  //   this.http.post('http://localhost:5001/post', this.post)
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       this.post.content = '';

  //       if(this.selectedFile){
  //       this.onUpload();}
  //      // this.selectedFile='';
  //     });
  }


}
