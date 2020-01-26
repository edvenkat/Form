import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppUpdate } from '@ionic-native/app-update';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpModule } from '@angular/http';
import { WebService } from '../providers/web-service';
import { ListPage } from '../pages/list/list';
import { DetailsPage } from '../pages/details/details';
import { UserDetails } from '../pages/userdetails/userdetails';
import { AmountUpdate } from '../pages/amountupdate/amountupdate';
import { Login } from '../pages/login/login';
import { MyDashboard } from '../pages/mydashboard/mydashboard';
import { MyOngoing } from '../pages/myongoing/myongoing';
import { MyClosed } from '../pages/myclosed/myclosed';
import { CloseDetails } from '../pages/closedetails/closedetails';
//import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Signup } from '../pages/signup/signup';
import { UpdatePage } from '../pages/update/update';
import { MyProfile } from '../pages/myprofile/myprofile';
import { ContactUs } from '../pages/contactus/contactus';
import { Voting } from '../pages/voting/voting';
import { VotingDetails } from '../pages/votingdetails/votingdetails';
import { Forgot } from '../pages/forgot/forgot';
import { HowItWorks } from '../pages/howitworks/howitworks';
import { Legal } from '../pages/legal/legal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
    UserDetails,
    AmountUpdate,
    Login,
    MyDashboard,
    MyOngoing,
    MyClosed,
    CloseDetails,
    Signup,
    UpdatePage,
    MyProfile,
    ContactUs,
    Voting,
    VotingDetails,
    Forgot,
    HowItWorks,
    Legal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
    UserDetails,
    AmountUpdate,
    Login,
    MyDashboard,
    MyOngoing,
    MyClosed,
    CloseDetails,
    Signup,
    UpdatePage,
    MyProfile,
    ContactUs,
    Voting,
    VotingDetails,
    Forgot,
    HowItWorks,
    Legal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebService,
    InAppBrowser,
    AppUpdate,
    Push,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
