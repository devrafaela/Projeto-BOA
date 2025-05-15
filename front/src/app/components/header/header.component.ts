import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //@Input() username: string = "";
  username = sessionStorage.getItem("username")


  constructor(public menuService:  MenuService) { }
  toggleMenu(): void {
    this.menuService.toggleMenu();
  }

}
