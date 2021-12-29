import { Component, OnInit } from '@angular/core';

import { ThemeService } from "src/app/theme/theme.service";
import { Cc20Component } from '../../security/cc20/cc20.component';
import { NotesComponent } from '../../security/notes/notes.component';

@Component({
  selector: 'app-main_view',
  templateUrl: './main_view.component.html',
  styleUrls: ['./main_view.component.scss']
})
export class MainViewComponent implements OnInit {
  currentItem!:  string;
  constructor(
    private themeService: ThemeService,
    private cc20: Cc20Component,
    private notes: NotesComponent,
  ) {
    this.currentItem="'notes'";
  }

  ngOnInit() {
  }
  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

  }

}
