import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ManageProductsComponent } from './Components/manage-products/manage-products.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ProductsComponent },
            {
                path: 'manage',
                data: { breadcrumb: 'manage' },
                component: ManageProductsComponent,
            },
            {
                path: ':id',
                data: { breadcrumb: ':id' },
                component: ProductDetailsComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
