import { Component, OnDestroy } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnDestroy {
  public isShowingRouteLoadIndicator: boolean;
  activeItem: MenuItem | undefined;

  constructor(
    private cookie: CookieService,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private cacheService: CacheService
  ) {
    this.isShowingRouteLoadIndicator = false;
    var asyncLoadCount = 0;
    router.events.subscribe((msg) => {
      //console.log(msg)
      //https://www.bennadel.com/blog/3505-showing-a-loading-indicator-for-lazy-loaded-route-modules-in-angular-6-1-7.htm
      if (msg instanceof RouteConfigLoadStart) {
        asyncLoadCount++;
      } else if (msg instanceof RouteConfigLoadEnd) {
        asyncLoadCount--;
      }
      this.isShowingRouteLoadIndicator = !!asyncLoadCount;
    });
  }

  private destroy$ = new Subject<void>();
  tieredItems: MenuItem[] = [];
  loading = false;

  activeMenu(event: any) {
    console.log(event);
    //console.log(event.target.classList);
    /*let node;
    if (event.target.classList.contains("p-submenu-header") == true) {
      node = "submenu";
    } else if (event.target.tagName === "SPAN") {
      node = event.target.parentNode.parentNode;
    } else {
      node = event.target.parentNode;
    }
    //console.log(node);
    if (node != "submenu") {
      let menuitem = document.getElementsByClassName("p-menuitem");
      for (let i = 0; i < menuitem.length; i++) {
        menuitem[i].classList.remove("active");
      }
      node.classList.add("active");
    }*/
  }

  ngOnInit() {
    this.tieredItems = [
      {
        label: 'HOME',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/app/home'],
      },
      {
        label: 'RANKING',
        icon: 'pi pi-fw pi-sort-numeric-down',
        routerLink: ['/app/ranking'],
      },
      {
        label: 'REGISTROS',
        icon: 'pi pi-fw pi-pencil',
        //routerLink: ['/app/registro'],
        items: [
          {
            label: 'NOVO',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/app/registros/novo'],
          },
          {
            label: 'LISTAR',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/app/registros/listar'],
          }
      ]},
      /*{
        label: 'ARMAMENTOS',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'NOVO',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/app/armamentos/', "novo"],
          }
        ],
      },
      {
        label: 'CAUTELAS',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'NOVO',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/app/cautelas/', "novo"],
          }
        ],
      },
      {
        label: 'Procedimentos',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/app/formularios'],
      },*/
      /*{
        label: 'Formulários',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/app/formularios'],
      },*/
      /*{
        label: 'Dados',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: ['/app/dados'],
      },*/
      {
        label: 'PARÂMETROS',
        icon: 'pi pi-fw pi-cog',
        //routerLink: ['/app/parametros'],
        items: [
          {
            label: 'NOVO',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/app/parametros/', "novo"],
          }
        ],
      } /*,
      { separator: true },
      {
            label: 'Sair',
            icon: 'pi pi-fw pi-sign-out',
            command: () => this.handleLogout()
        }*/,
    ];

    //this.activeItem = this.tieredItems[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  finalizeLogOut() {
    this.cookie.delete('USER_INFO');
    this.cookie.delete('TOKEN');
    this.cookie.delete('X-Token');
    this.cacheService.clear('listar.efetivo.full')
    this.cacheService.clear('editar.registro')
    this.cacheService.clear('listar.registro')
    this.loading = false;
    void this.router.navigate(['/']);
  }
  handleLogout(): void {
    this.loading = true;
    this.loginService
      .logOutUser()
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            this.finalizeLogOut()
          }
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'error ao fazer logout',
            detail: err.status,
            life: 3000,
          });
          this.finalizeLogOut()
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
