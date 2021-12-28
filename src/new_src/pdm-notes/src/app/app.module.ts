import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformModule } from './platform/platform.module';
import { HttpClientModule } from "@angular/common/http";
// PlatformComponent
import { AppRoutingModule } from './app-routing.module';
// import { PlatformComponent } from './platform/platform.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityComponent } from './security/security.component';
import { EmscriptenWasmComponent } from './security/emscripten-wasm.component';


@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
      EmscriptenWasmComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    PlatformModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
