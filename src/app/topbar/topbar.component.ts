import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  isMenuOpen = false;
  userName = 'Gustavo Puglot';

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
