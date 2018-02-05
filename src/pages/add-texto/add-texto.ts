import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'page-add-texto',
  templateUrl: 'add-texto.html',
})
export class AddTextoPage {
  form: FormGroup;
  numero: string = '';
  textos: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider
  ) {
    this.fire.getTextosDesc()
      .subscribe(textos => {
        this.textos = this.fire.snapshotParaValue(textos);
        console.log(this.textos)
      })
    this.form = new FormGroup({
      'numero': new FormControl('',Validators.required),
      'autor': new FormControl('')
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTextoPage');
  }

  enviar(){
    if(+this.numero > 0)
    this.fire.addTexto(+this.numero)
      .then(_ => {
        this.numero = '';
      })
  }

}