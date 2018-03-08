import { Media, MediaObject } from '@ionic-native/media';
import { Injectable } from '@angular/core';
import { LoadingController, Loading, Range } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilProvider {
  
  loading: Loading
  faixaTocando: MediaObject;
  podcastTocando: any;
  tocando: boolean = false;
  faixaSubject: BehaviorSubject<any>
  public duracaoFaixa: string;
  public observableFaixa$: Observable<any>;
  public observerFaixa: Observer<any>;
  constructor(public loadingCtrl: LoadingController, public media: Media) {
    console.log('Hello UtilProvider Provider');
    this.faixaSubject = new BehaviorSubject(null);
    this.observableFaixa$ = this.faixaSubject.asObservable();
    /*this.observableFaixa$ = new Observable(faixa => {
      faixa.next('teste');
    })*/
  }

  load(tempo?:number){
    
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

  stopLoading(){
    this.loading.dismiss();
  }

  tocar(podcast){
    console.log('tocar no service')
    if(this.podcastTocando == podcast && this.tocando){
      this.faixaTocando.pause();
      this.tocando = false;
      this.faixaSubject.next({podcast: podcast, tocando: this.tocando, faixa: this.faixaTocando});
    }
    else if(this.podcastTocando == podcast && !this.tocando){
      this.faixaTocando.play();
      this.tocando = true;
      this.faixaSubject.next({podcast: podcast, tocando: this.tocando, faixa: this.faixaTocando});
    }
    else{
      if(this.faixaTocando)
        this.faixaTocando.stop();
      this.faixaTocando = this.media.create(podcast.linkStorage);
      this.faixaTocando.play();
      this.tocando = true;
      this.faixaSubject.next({podcast: podcast, tocando: this.tocando, faixa: this.faixaTocando});
      this.podcastTocando = podcast;
    }

    this.faixaTocando.onStatusUpdate.subscribe(status => {
      console.log(status);
      setTimeout(() => {
        this.duracaoFaixa = (this.faixaTocando.getDuration()/60).toFixed(0).toString(),':',(this.faixaTocando.getDuration()%60).toFixed(0).toString();
        console.log(this.duracaoFaixa);
      }, 500);
    });

  }
}
