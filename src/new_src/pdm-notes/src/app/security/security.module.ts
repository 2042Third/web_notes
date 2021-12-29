import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cc20Component } from './cc20/cc20.component';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HumanizeTimePipe } from "./humanize-time-pipe";
@NgModule({
  exports:[Cc20Component],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    Cc20Component,
    HumanizeTimePipe,

    ]
})
export class SecurityModule { }
