import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FireProvider {

  constructor(
    public db: AngularFireDatabase
  ) {
    console.log('Hello FireProvider Provider');
  }

  getTextos():Observable<any>{
    return this.db.list('textos').snapshotChanges();
  }

  getTextosDesc():Observable<any>{
    return this.db.list('textos', ref => ref.orderByChild('timestamp').limitToFirst(10)).snapshotChanges();
  }

  getPodcastBySeason(season: any){
    return this.db.list('podcasts', ref => ref.orderByChild('season').equalTo(season)).valueChanges();
  }

  snapshotParaValue(lista: AngularFireAction<DatabaseSnapshot>[]){
    let novaLista = [];
    lista.map(objeto => {
      let novoObjeto = {};
      novoObjeto['key'] = objeto.key;
      let val = objeto.payload.val();
      Object.keys(val).map(key => {
        novoObjeto[key] = val[key]
      });
      novaLista.push(novoObjeto);
    });
    return novaLista;
  }

  addTextos(numero){
    let timestamp = new Date().getTime();
    if(numero <= 168){
      this.db.list('textos').push({numero: numero, timestamp: -timestamp, corpo: '', paragrafos: []})
        .then(_ => {
          console.log(numero);
          this.addTextos(numero+1);
        })
    }
    else
      return
  }

  addTexto(numero){
    let timestamp = new Date().getTime();
    return this.db.list('textos').push({numero: numero, timestamp: -timestamp, corpo: '', paragrafos: []})
  }
}
