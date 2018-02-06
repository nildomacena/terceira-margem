import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { NativeAudio } from '@ionic-native/native-audio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FireProvider } from '../providers/fire';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UtilProvider } from '../providers/util';
import { ReactiveFormsModule } from '@angular/forms';

const config = {
  apiKey: "AIzaSyCgcxGVoyrah9RY-Aq3gxmVABUIDKdRR58",
  authDomain: "terceira-margem.firebaseapp.com",
  databaseURL: "https://terceira-margem.firebaseio.com",
  projectId: "terceira-margem",
  storageBucket: "terceira-margem.appspot.com",
  messagingSenderId: "775958970136"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireProvider,
    UtilProvider
  ]
})
export class AppModule {}
