import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, LoadingController, Platform, AlertController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer } from '@angular/platform-browser';
import { WebService } from '../../providers/web-service';
import { UserDetails } from '../userdetails/userdetails';
import { MyDashboard } from '../mydashboard/mydashboard';

declare var jQuery;

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit {
  user: FormGroup;
  userAmount: FormGroup;

  submitted = false;
  submittedNew = false;
  contestDetails: Array<any> = new Array(0);
  contestType: any;
  contestId: any;
  contestInfo: any
  contestPriceType: any;
  userAmount1: any;
  userAmount2: any;
  userAmount21: any;
  entryPrice : 0;
  contestDesc : any;
  animation = {animate: true, animation: "transition-ios"};

  ngOnInit() {
    this.user = new FormGroup({
      userAmount1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
      userAmount2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')]))
      
      //userAmount1 : new FormControl('',Validators.compose([Validators.required,Validators.pattern('[^0-9]')])),
      //userAmount2 : new FormControl('',Validators.compose([Validators.required,Validators.pattern('[^0-9]')])),
    });
    this.userAmount = new FormGroup({
      userAmount21: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')]))
    })

  }
  goToUserDetails() {
    var postDetails = { "contest_id": this.contestId,"contest_type":this.contestType,"contest_info":this.contestInfo };
    this.navCtrl.push(UserDetails, postDetails, this.animation);
  }
  keyUpChecker1(ev) {
    console.log("calling")
    let elementChecker: string;
    let format = /^[1-9][0-9]*?$/g;
    elementChecker = ev.target.value;
    console.log(elementChecker);
    if(format.test(elementChecker) === false) {
      console.log("if")
      this.userAmount1 = elementChecker.replace(/^0+/, '');
      //this.userAmount1 = elementChecker.slice(0, -1);
    }
  }
  keyUpChecker2(ev) {
    let elementChecker: string;
    let format = /[^0-9]/g;
    elementChecker = ev.target.value;
    if(format.test(elementChecker)) {
      this.userAmount2 = elementChecker.slice(0, -1);
    } else if(elementChecker.length > 2) {
      this.userAmount2 = elementChecker.slice(0, -1);
    }
  }
  keyUpChecker21(ev) {
    let elementChecker: string;
    let format = /^[1-9][0-9]*?$/g;
    elementChecker = ev.target.value;
    if (format.test(elementChecker)===false) {
      this.userAmount21 = elementChecker.replace(/^0+/, '');
    }
  }
  sendDetails() {
    console.log(this.user);
    console.log(this.user.status);

    if (this.user.status === "INVALID") {
      console.log("came");
      this.submitted = true;
    }
    if (this.user.status === "VALID") {
      console.log("userAmount1 -" + this.user.value.userAmount1);
      console.log("userAmount2 -" + this.user.value.userAmount2);
      this.getConfirmation(this.user.value.userAmount1,this.user.value.userAmount2);
      //this.joinContestDetails(this.user.value.userAmount1,this.user.value.userAmount2);
    }
  }

  sendAmountDetails() {
    console.log(this.userAmount);
    console.log(this.userAmount.status);

    if (this.userAmount.status === "INVALID") {
      console.log("came");
      this.submittedNew = true;
    }
    if (this.userAmount.status === "VALID") {
      console.log("userAmount2 -" + this.userAmount.value.userAmount21);
      this.getConfirmation(this.userAmount.value.userAmount21,"00");
      //this.joinContestDetails(this.user.value.userAmount1,this.user.value.userAmount2);
    }
  }
  joinContestDetails(amount1 : any,amount2: any) {
    const joinContestDetailsLoader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<div><img src="assets/imgs/loading.gif" /><div class="pt12">Loading....</div></div>'
    });
    joinContestDetailsLoader.present();
    this.webService.joinContent(this.contestId,this.contestType,amount1,amount2)
      .subscribe(res => {
        console.log(res);
        console.log(this.contestPriceType)
        if (res.status == "success") {
          joinContestDetailsLoader.dismiss();
          if(this.contestPriceType==="type1") {
            this.user.reset();
          } else {
            this.userAmount.reset();
          }
          

          const success_alert = this.alertCtrl.create({
            // title: 'Network Error',
            subTitle: res.message,
            buttons: ['OK']
          });
          success_alert.present();
        }
        if (res.status == "error") {
          joinContestDetailsLoader.dismiss();
          const error_alert = this.alertCtrl.create({
            // title: 'Network Error',
            subTitle: res.message,
            buttons: ['OK']
          });
          error_alert.present();
        }
      },
        error => {
          joinContestDetailsLoader.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Network Error',
            subTitle: 'Sorry...!!!. Please try again later',
            //subTitle: JSON.stringify(error),
            buttons: ['OK']
          });
          alert.present();

        }
      );
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public platform: Platform, public webService: WebService, public alertCtrl: AlertController, public toastCtrl: ToastController,private socialSharing: SocialSharing,private sanitizer: DomSanitizer  ) {
    var temp = this;
    const loaderDetails = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<div><img src="assets/imgs/loading.gif" /><div class="pt12">Loading....</div></div>'
    });
    loaderDetails.present();
    platform.ready().then(() => {
      //this.showInterstitial();
      var filterObject = this.navParams.data;
      console.log(filterObject);
      this.contestId = filterObject.contest_id;
      this.webService.getContentDetails(filterObject.contest_id, filterObject.contest_type)
        .subscribe(res => {
          console.log(res);
          if (res.status == "success") {
            loaderDetails.dismiss();
            this.contestDetails = res.details;
            this.contestPriceType = res.details.contestPriceType
            this.contestType = res.contestType;
            this.contestInfo = res.details.info;
            this.entryPrice = res.details.contest_entry_price;
            this.contestDesc = this.sanitizer.bypassSecurityTrustHtml(res.details.product_desc);
            if(res.details.contest_close_timestamp!="") {
              var temp = this;
              setTimeout(function() {
                if(temp.contestType === "nonfree")
                  temp.timerInialize(res.details)
                if(temp.contestType === "free")
                  temp.freeTimerInialize(res.details)
              },500)
            }
              
          }
          if (res.status == "error") {
            loaderDetails.dismiss();
            const error_alert = this.alertCtrl.create({
              // title: 'Network Error',
              subTitle: res.message,
              buttons: ['OK']
            });
            error_alert.present();
          }
        },
          error => {
            loaderDetails.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Network Error',
              subTitle: 'Sorry...!!!. Please try again later',
              //subTitle: JSON.stringify(error),
              buttons: ['OK']
            });
            alert.present();

          }
        );

    });
  }
  
  getConfirmation(rupee : any ,paisa :any ) {
    
    const loaderConfirmation = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<div><img src="assets/imgs/loading.gif" /><div class="pt12">Loading....</div></div>'
    });
    loaderConfirmation.present();

    this.webService.getConfirmation(this.entryPrice, this.contestType)
    .subscribe(res => {
      console.log(res);
      loaderConfirmation.dismiss();
      if (res.status == "success") {
        
      
          const prompt = this.alertCtrl.create({
            // title: 'CONFIRMATION',
            // message: '<ion-row no-padding><ion-col text-left col-6>Entry</ion-col><ion-col text-righ col-12>30</ion-col></ion-row>',
            title: '<h1 class="c-no-margin winner-alert-title">CONFIRMATION</h1>',
            message: 
                     '<div class="row">' +
                     '<div class="col-50 left">Entry Price</div>' +
                     '<div class="col-50 right">'+res.entry_price+'</div>' +
                     '</div>' +
                     '<div class="row">' +
                     '<div class="col-50 left">Cash Bonus</div>' +
                     '<div class="col-50 right">'+res.cashback+'</div>' +
                     '</div>' + 
                     '<div class="row">' +
                     '<div class="col-50 left">To Pay</div>' +
                     '<div class="col-50 right">'+res.amount+'</div>' +
                     '</div>',
            buttons: [
              {
                text: 'Cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Join',
                handler: data => {
                  console.log('Saved clicked');
                  this.joinContestDetails(rupee,paisa);
                }
              }
            ]
          });
          prompt.present();

      }
      if (res.status == "error_balance") {
        const error_amount_alert = this.alertCtrl.create({
          // title: 'Network Error',
          subTitle: res.message,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('Ok clicked');
              }
            },
            {
              text: 'Add Cash',
              handler: data => {
                console.log('Add Cash clicked');
                this.navCtrl.push(MyDashboard, null, this.animation);
              }
            }
         ]
        });
        error_amount_alert.present();
        //this.navCtrl.push(MyDashboard);
      }
      if (res.status == "error") {
        loaderConfirmation.dismiss();
        const error_alert = this.alertCtrl.create({
          // title: 'Network Error',
          subTitle: res.message,
          buttons: ['OK']
        });
        error_alert.present();
      }
    },
      error => {
        loaderConfirmation.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Network Error',
          subTitle: 'Sorry...!!!. Please try again later',
          //subTitle: JSON.stringify(error),
          buttons: ['OK']
        });
        alert.present();

      }
    );

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  socialSharingLink(share_url) {
    console.log(share_url);
    //this.goToUpdate();
    this.socialSharing.share(null, null, null, share_url);
  }
  timerInialize(contest) {
    console.log(contest)
     var id = '#contest_timer_'+contest.contest_id;
     var time = contest.contest_close_timestamp
     jQuery("#contestDetails "+id).backward_timer({
      seconds: time,
      format: 'd%d h%h m%m s%s',
           on_exhausted: function(timer) {
           }
   });
   console.log("start");
   jQuery("#contestDetails "+id).backward_timer('start');
}

freeTimerInialize(contest) {
  console.log(contest)
   var id = '#contest_timer_'+contest.free_contest_id;
   var time = contest.contest_close_timestamp
   jQuery("#contestDetails "+id).backward_timer({
    seconds: time,
    format: 'd%d h%h m%m s%s',
         on_exhausted: function(timer) {
         }
 });
 console.log("start");
 jQuery("#contestDetails "+id).backward_timer('start');
}

}