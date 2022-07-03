import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params["signedIn"] !== undefined && params["signedIn"] === "true"){
        this.toastr.success("Sign In Successful");
      }
    })

  }

}
