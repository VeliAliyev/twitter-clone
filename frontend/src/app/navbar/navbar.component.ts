import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url: string;

  constructor(private router: Router) {
    this.url = this.router.url;
    console.log("URL : " + this.url)
   }

  ngOnInit(): void {
  }

}
