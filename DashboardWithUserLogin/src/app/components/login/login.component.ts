import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
constructor(private authservice: AuthServiceService, private router: Router){}

  ngOnInit(): void {
  }
submitForm(){
  if(this.loginForm.valid){
    this.authservice.login(this.loginForm.value).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['/admin']);
      },
      (err: Error) =>{
        alert(err.message);
      }
    ); 
  }
}

}
