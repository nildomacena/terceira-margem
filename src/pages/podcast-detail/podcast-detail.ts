import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-podcast-detail',
  templateUrl: 'podcast-detail.html',
})
export class PodcastDetailPage {
  podcast: any = {
    titulo: '',
    video: '',
    podcast: ''
  }
  video: any;
  sanitized: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer
  ) {
    this.podcast = this.navParams.get('podcast');
    if(this.podcast.video){
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.podcast.video);
      this.sanitized = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastDetailPage');
  }

}
