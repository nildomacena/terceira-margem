import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextoDetailPage } from './texto-detail';

@NgModule({
  declarations: [
    TextoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TextoDetailPage),
  ],
})
export class TextoDetailPageModule {}
