import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkPageComponent } from './pages/bookmark-page/bookmark-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignInComponent } from './pages/landing-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/landing-page/sign-up/sign-up.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TweetPageComponent } from './pages/tweet-page/tweet-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path : "" , component: LandingPageComponent},
  {path : "sign-in" , component: SignInComponent},
  {path : "sign-up" , component: SignUpComponent},
  {path : "home" , component: HomePageComponent, canActivate: [AuthGuard]},
  {path : "tweet/:id" , component: TweetPageComponent, canActivate: [AuthGuard]},
  {path : "profile/tweets" , component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path : "profile/retweets" , component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path : "profile/replies" , component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path : "profile/likes" , component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path : "profile/update" , component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path : "bookmarks" , component: BookmarkPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
