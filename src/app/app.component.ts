import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UtilProvider } from '../providers/util';
import { MediaObject } from '@ionic-native/media';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Range) range: Range;
  rootPage: any = 'TextosPage';
  duracaoFaixa: string;
  pages: Array<{title: string, component: any, icon?: string}>;
  podcastTocando: any;
  faixaTocando: MediaObject;
  tocando: boolean = false;
  atual: number = 15;
  tempoFaixa: number = 0;
  labelRight: string = '0:00'
  labelLeft: string = '0:00'
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public screenOrientation: ScreenOrientation,
    public util: UtilProvider

  ) {
    this.initializeApp();
    this.util.observableFaixa$.subscribe(result => {
      console.log('observable faixa ',result);
      if(result){
        this.faixaTocando = result.faixa;
        this.tocando = result.tocando;
        this.podcastTocando = result.podcast;
        this.faixaTocando.getCurrentPosition()
          .then(valor => {
          this.atual = valor;
          this.labelLeft = this.atual < 10? '00:0'+(this.atual%60).toFixed(0).toString(): this.atual < 60? '00:'+(this.atual%60).toFixed(0).toString(): (this.atual/60).toFixed(0).toString()+':'+(this.atual%60).toFixed(0).toString();
          console.log('getCurrentPosition', valor)
        });
      }
    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Textos', component: 'TextosPage', icon: 'document'},
      { title: 'Podcast', component: 'PodcastPage', icon:'headset'},
      { title: 'Vídeos', component: 'VideosPage', icon:'logo-youtube'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#73c9eb');
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  playPause(){
    this.util.tocar(this.podcastTocando);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
