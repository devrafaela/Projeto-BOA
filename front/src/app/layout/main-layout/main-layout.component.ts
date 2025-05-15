import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { MenuComponent} from "../../components/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { MenuService} from '../../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, FooterComponent, MenuComponent, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  menuVisible: boolean = true;
  constructor(private menuService: MenuService){}
  ngOnInit(): void{
    this.menuService.MenuVisible$.subscribe(visible => {
      this.menuVisible = visible
    } );
  }

}
