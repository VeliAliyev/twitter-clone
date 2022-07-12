import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './landing-page/sign-in/sign-in.component';
import { SignUpComponent } from './landing-page/sign-up/sign-up.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TweetPageComponent } from './tweet-page/tweet-page.component';

const routes: Routes = [
  {path : "" , component: LandingPageComponent},
  {path : "sign-in" , component: SignInComponent},
  {path : "sign-up" , component: SignUpComponent},
  {path : "home" , component: HomePageComponent},
  {path : "tweet/:id" , component: TweetPageComponent},
  {path : "profile/tweets" , component: ProfilePageComponent},
  {path : "profile/retweets" , component: ProfilePageComponent},
  {path : "profile/replies" , component: ProfilePageComponent},
  {path : "profile/likes" , component: ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
