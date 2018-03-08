import { FireProvider } from './../../providers/fire';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { UtilProvider } from '../../providers/util';

@IonicPage()
@Component({
  selector: 'page-podcast',
  templateUrl: 'podcast.html',
})
export class PodcastPage {
  podcasts: any[] = []
  season: number = 5;
  transfer: FileTransferObject;
  podcastBaixando: any;
  podcastTocando: any;
  progresso:number = 0;
  tocando: boolean = false;
  faixaTocando: MediaObject;
  constructor(
    public util: UtilProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public zone: NgZone,
    public fileTransfer: FileTransfer,
    public file: File,
    public media: Media
  ) {
    this.fire.getPodcastBySeason(5)
      .subscribe(podcasts => {
        this.zone.run(() => {
          this.podcasts = podcasts;
          this.podcasts.map(podcast => {
            console.log(this.file.dataDirectory);
            this.file.checkFile(this.file.dataDirectory, podcast.titulo + '.mp3')
              .then(result => {
                  podcast['baixado'] = result;
                  if(result)
                    podcast['linkStorage'] = this.file.dataDirectory+ podcast.titulo + '.mp3'
              })
              .catch(err => {
                console.error(err);
              })
          })
          console.log(this.podcasts);
        })
      });
    this.transfer = this.fileTransfer.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastPage2');
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
  tocar(podcast){
    this.util.tocar(podcast);
    /*
    if(this.podcastTocando == podcast && this.tocando){
      this.faixaTocando.pause();
      this.tocando = false;
    }
    else if(this.podcastTocando == podcast && !this.tocando){
      this.faixaTocando.play();
      this.tocando = true;
    }
    else{
      if(this.faixaTocando)
        this.faixaTocando.stop();
      this.faixaTocando = this.media.create(podcast.linkStorage);
      this.faixaTocando.play();
      this.tocando = true;
      this.podcastTocando = podcast;
    }
    this.faixaTocando.onStatusUpdate.subscribe(status => console.log(status));*/
    
  }

  baixarPodcast(podcast){
    console.log(podcast.link, this.podcastBaixando);
    if(this.file.dataDirectory + podcast.titulo + '.mp3'){
      console.log('Achou', this.file.dataDirectory + podcast.titulo + '.mp3');
    }
    this.transfer.onProgress((progressEvent: ProgressEvent) => {
      console.log('onprogress')
      this.zone.run(() => {
        this.progresso = Math.round((progressEvent.loaded / progressEvent.total)*100); 
        })
      })
    if(podcast == this.podcastBaixando)
    if(podcast != this.podcastBaixando)
      this.podcastBaixando = podcast;
      console.log('entrou')
      this.transfer.download(podcast.link, this.file.dataDirectory + podcast.titulo + '.mp3')
        .then(data => {
          this.podcastBaixando = null;
          this.progresso = 0;
          console.log('salvou teste', data.toURL());
        })
        .catch(err => {
          this.podcastBaixando = null;
          this.progresso = 0;
          console.error(err);
        });
  }

  playMedia(podcast){
    let faixaOnline = this.media.create(podcast.link);
    faixaOnline.play();
    faixaOnline.onStatusUpdate.subscribe(result => {
      console.log(result)
    })
  }

}
