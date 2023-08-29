import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OldProduct } from 'src/app/demo/api/OldProduct';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
    product!: OldProduct;
    id!: any;
    loading = false;
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    constructor(
        private activeRoute: ActivatedRoute,
        private service: ProductService
    ) {
        this.id = this.activeRoute.snapshot.paramMap.get('id');
    }
    ngOnInit(): void {
        this.getProductById(this.id);
        this.items = [
            { label: 'Products', routerLink: '/uikit/products/' },
            { label: this.id, routerLink: '/uikit/products/' + this.id },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    public getProductById(id: number) {
        this.loading = true;
        this.service.getProductById(id).subscribe(
            (response: any) => {
                console.log(response);
                this.product = response as OldProduct;
            },
            (error) => {
                alert(error.message);
            }
        );
    }
}
