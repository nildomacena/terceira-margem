import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-texto-detail',
  templateUrl: 'texto-detail.html',
})
export class TextoDetailPage {
  texto: any;
  font_size = 1.6;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    this.texto = {
      numero: 0,
      corpo: '',
      autor: ''
    }
    this.texto = this.navParams.get('texto');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextoDetailPage');
  }

  aumentarFonte(){
    this.font_size = this.font_size + 0.1;
  }

  diminuirFonte(){
    this.font_size = this.font_size - 0.1;
  }

}
