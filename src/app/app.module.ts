import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { FruitComponent } from './fruit/fruit.component';
import { AlertComponent } from './alert/alert.component';
import { FruitService } from './services/fruit.service';
import { FruitModule } from './fruit/fruit.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    FruitModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
