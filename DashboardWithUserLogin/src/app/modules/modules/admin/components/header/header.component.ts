import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  constructor(private authservice: AuthServiceService) { }

  ngOnInit(): void {
  }
logOut(): void{
this.authservice.logOut();
}
}
