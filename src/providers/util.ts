import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class UtilProvider {
  loading: Loading
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello UtilProvider Provider');
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

}
