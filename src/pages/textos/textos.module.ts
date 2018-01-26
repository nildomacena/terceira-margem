import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextosPage } from './textos';

@NgModule({
  declarations: [
    TextosPage,
  ],
  imports: [
    IonicPageModule.forChild(TextosPage),
  ],
})
export class TextosPageModule {}
