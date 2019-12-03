import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChatModule} from './chat.module'
//import { NbThemeModule, NbLayoutModule, NbChatModule, NbSpinnerModule } from '@nebular/theme';
//import { NbEvaIconsModule } from '@nebular/eva-icons';
//import { ChatbotComponent } from './chatbot/chatbot.component';
  

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChatModule
    ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }