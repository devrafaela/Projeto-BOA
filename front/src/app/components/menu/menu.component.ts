import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, MatSidenavModule, MatToolbarModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuVisible: boolean = false;

  constructor(private loginService: LoginService, private menuService: MenuService) {

  }
  ngOnInit(): void {
    this.menuService.MenuVisible$.subscribe(visible => {
      this.menuVisible = visible;
    });
  }

  logout(): void {
    this.loginService.deslogar();
  }
}

