import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformModule } from './platform/platform.module';
// PlatformComponent
import { AppRoutingModule } from './app-routing.module';
// import { PlatformComponent } from './platform/platform.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    PlatformModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
