import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ReplyComponent } from './reply/reply.component';
import { RetweetComponent } from './retweet/retweet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { TweetComponent } from './tweet/tweet.component';
import { TweetPageComponent } from './pages/tweet-page/tweet-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { BookmarkPageComponent } from './pages/bookmark-page/bookmark-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SignInComponent } from './pages/landing-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/landing-page/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/token-interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    BookmarkComponent,
    ReplyComponent,
    RetweetComponent,
    TweetComponent,
    TweetPageComponent,
    HomePageComponent,
    ProfilePageComponent,
    BookmarkPageComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
