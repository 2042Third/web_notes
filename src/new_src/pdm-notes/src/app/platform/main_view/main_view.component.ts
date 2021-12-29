import { Component, OnInit } from '@angular/core';

import { ThemeService } from "src/app/theme/theme.service";
import { Cc20Component } from '../../security/cc20/cc20.component';

@Component({
  selector: 'app-main_view',
  templateUrl: './main_view.component.html',
  styleUrls: ['./main_view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private cc20: Cc20Component,
  ) {}

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
