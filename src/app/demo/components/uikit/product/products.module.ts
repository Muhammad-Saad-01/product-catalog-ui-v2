import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './products-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { UIkitModule } from '../uikit.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ProductsComponent } from './products.component';
import { TruncatePipe } from 'src/app/demo/pipes/truncate.pipe';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { SelectComponent } from './Components/select/select.component';
import { ManageProductsComponent } from './Components/manage-products/manage-products.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        UIkitModule,
        MultiSelectModule,
        DialogModule,
        ProgressSpinnerModule,
        CardModule,
        BreadcrumbModule,
        CommonModule,
        CheckboxModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ImageModule,
        ChipsModule,
        ChipModule,
        ToggleButtonModule,
    ],
    declarations: [
        ProductsComponent,
        SelectComponent,
        TruncatePipe,
        ProductDetailsComponent,
        ManageProductsComponent,
    ],
})
export class ProductsModule {}
