import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  listMenu: Menu[] = [
    {name: 'Home', active: true, activeState: 'home', url: 'home'},
    {name: 'Server', active: false, activeState: 'server', url: 'server'},
    {name: 'Repository', active: false, activeState: 'repository', url: 'repository'},
    // {name: 'Script', active: false, activeState: 'script', url: 'script'},
    {name: 'Operation', active: false, activeState: 'operation', url: 'operation'},
    {name: 'History', active: false, activeState: 'deploy-history', url: 'deploy/history'},
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.firstChild.data.subscribe(data => {
      const index: number = this.listMenu.findIndex((x: Menu) => x.active === true);
      const currentActiveMenu: Menu = this.listMenu[index];
      currentActiveMenu.active = false;
      this.listMenu[index] = currentActiveMenu;
      const indexToActive: number = this.listMenu.findIndex((x: Menu) => x.activeState === data.activeState);
      const menuToActive: Menu = this.listMenu[indexToActive];
      menuToActive.active = true;
      this.listMenu[indexToActive] = menuToActive;
    });
  }

  menuActive(menu: Menu) {
    if (typeof menu.url !== 'undefined') {
      this.router.navigate([menu.url], {relativeTo: this.route}).then(route => {
      });
    }
    const index: number = this.listMenu.findIndex((x: Menu) => x.active === true);
    if (typeof index !== 'undefined') {
      const currentActiveMenu: Menu = this.listMenu[index];
      currentActiveMenu.active = false;
      this.listMenu[index] = currentActiveMenu;
    }
    const indexToActive: number = this.listMenu.findIndex((x: Menu) => x === menu);
    if (typeof indexToActive !== 'undefined') {
      const menuToActive: Menu = this.listMenu[indexToActive];
      menuToActive.active = true;
      this.listMenu[indexToActive] = menuToActive;
    }
  }
}

export interface Menu {
  name: string;
  active: boolean;
  activeState: string;
  url?: string;
}
