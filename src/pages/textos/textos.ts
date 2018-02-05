import { UtilProvider } from './../../providers/util';
import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-textos',
  templateUrl: 'textos.html',
})
export class TextosPage {
  textos: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public util: UtilProvider
  ) {
    this.util.load();
    this.fire.getTextosDesc().subscribe(snap => {
      this.textos = this.fire.snapshotParaValue(snap);
      console.log(this.textos);
      this.util.stopLoading();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextosPage');
  }


  irParaTexto(texto){
    this.navCtrl.push('TextoDetailPage',{texto: texto});
  }

}
