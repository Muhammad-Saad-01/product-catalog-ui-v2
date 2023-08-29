import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Catalog',
                items: [
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/uikit/products'],
                    },
                    {
                        label: 'Manage Products',
                        icon: 'pi pi-fw pi-wrench',
                        routerLink: ['/uikit/products/manage'],
                    },
                ],
            },
            {
                label: 'Brands',
                items: [
                    {
                        label: 'Brands',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/brands'],
                    },
                    {
                        label: 'Manage Brands',
                        icon: 'pi pi-fw pi-wrench',
                        routerLink: ['/brands/manage'],
                    },
                ],
            },
            {
                label: 'Categories',
                items: [
                    {
                        label: 'Categories',
                        icon: 'pi pi-fw pi-tags',
                        routerLink: ['/uikit/categories'],
                    },
                    {
                        label: 'Manage Categories',
                        icon: 'pi pi-fw pi-wrench',
                        routerLink: ['/pages/categories'],
                    },
                ],
            },
        ];
    }
}
