import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTextoPage } from './add-texto';

@NgModule({
  declarations: [
    AddTextoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTextoPage),
  ],
})
export class AddTextoPageModule {}
