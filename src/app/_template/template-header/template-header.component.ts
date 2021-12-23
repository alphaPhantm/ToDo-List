import {Component, OnInit, Renderer2} from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.sass']
})
export class TemplateHeaderComponent implements OnInit {

  private isLight: boolean = false;

  faMoon = faMoon;
  faSun = faSun;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  toggleTheme($event: any): void {
    if (this.isLight) {
      this.isLight = false;
      this.renderer.removeClass(document.body, "dark")
    } else {
      this.isLight = true;
      this.renderer.addClass(document.body, "dark")
    }
  }

}
