import { UtilProvider } from './../../providers/util';
import { FireProvider } from './../../providers/fire';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  podcasts: any[] = []
  season: number = 5;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public zone: NgZone,
    public fire: FireProvider,
    public util: UtilProvider
  ) {
    this.util.load();
    this.fire.getPodcastBySeason(5)
      .subscribe(podcasts => {
        this.zone.run(() => {
          this.podcasts = podcasts;
          this.util.stopLoading();
        })
      })
  }

  getSeason(season:number){
    this.season = season;
    this.util.load();
    this.fire.getPodcastBySeason(season)
      .subscribe(podcasts => {
        this.zone.run(() => {
          this.podcasts = podcasts;
          this.util.stopLoading();
        })
      })
  }
  goToPodcast(podcast: any){
    this.navCtrl.push('PodcastDetailPage',{podcast: podcast});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

}
