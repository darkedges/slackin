import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { PopoverModule } from "ng2-popover";

// Must export the config
export const firebaseConfig = {
  apiKey: "HjTSq3llE5QT7hmLgujMeC1PmV7Q6GN6us9rDisd",
  authDomain: "https://www.darkedges.com/",
  databaseURL: "https://darkedges-public-slack.firebaseio.com/",
  storageBucket: "<your-storage-bucket>"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    PopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }