import { FireProvider } from './../../providers/fire';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-podcast',
  templateUrl: 'podcast.html',
})
export class PodcastPage {
  podcasts: any[] = []
  season: number = 5;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public zone: NgZone
  ) {
    this.fire.getPodcastBySeason(5)
      .subscribe(podcasts => {
        this.zone.run(() => {
          this.podcasts = podcasts;
          console.log(this.podcasts);
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastPage');
  }

  getSeason(season:number){
    this.season = season;
    this.fire.getPodcastBySeason(season)
      .subscribe(podcasts => {
        this.zone.run(() => {
          this.podcasts = podcasts;
          console.log(this.podcasts);
        })
      })
  }

}
