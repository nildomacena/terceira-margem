import { YoutubePipe } from './../../pipes/youtube/youtube';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';

@NgModule({
  declarations: [
    VideosPage,
    YoutubePipe
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
  ],
})
export class VideosPageModule {}
