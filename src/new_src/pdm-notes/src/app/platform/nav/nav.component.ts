import { Component, OnInit } from '@angular/core';
import {
  faLightbulb as faSolidLightbulb,
  faListAlt,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
import { ThemeService } from "src/app/theme/theme.service";
import { MainViewComponent } from '../main_view/main_view.component';


@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  faLightbulb!: IconDefinition;
  faDollarSign =   faListAlt;
  // main!:MainViewComponent;
  constructor(
    private themeService: ThemeService,
    private main:MainViewComponent,
  ) {
    // main = MainViewComponent;

  }

  ngOnInit() {
    this.setLightbulb();
  }

  


  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

    this.setLightbulb();
  }
}
