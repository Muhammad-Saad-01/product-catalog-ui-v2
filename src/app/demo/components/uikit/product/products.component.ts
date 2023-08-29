import { Component, OnInit } from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';

import { SelectItem, SelectItemGroup } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Brand } from 'src/app/demo/api/Brand';
import { Category } from 'src/app/demo/api/Category';
import { OldProduct } from 'src/app/demo/api/OldProduct';
import { Product } from 'src/app/demo/api/product';
import { BrandService } from 'src/app/demo/service/brand.service';
import { CategoryService } from 'src/app/demo/service/category.service';

import { ProductService } from 'src/app/demo/service/product.service';
interface SelectedGroups {
    [groupLabel: string]: SelectItem[]; // Replace 'any' with the actual type of your filter items
}
interface CustomeSelectItemGroup extends SelectItemGroup {
    imgUri?: string;
    icon?: string;
}

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}
@Component({
    templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    brands: Brand[] = [];
    filterGroup!: CustomeSelectItemGroup[];
    sortOptions: SelectItem[] = [];
    display: boolean = false;
    sortOrder: number = 0;

    sortField: string = '';

    loading = false;

    totalRecords: number = 0;

    first: number = 0;

    filterString: string = '';
    rows: number = 10;
    constructor(
        private productService: ProductService,
        private brandService: BrandService,
        private categoryService: CategoryService
    ) {
        this.getAllProducts();
        this.getAllCategories();
        this.getAllBrands();
    }

    ngOnInit() {
        this.sortOptions = [
            {
                label: 'Price High to Low',
                value: '!price',
                icon: 'pi pi-sort-amount-down-alt',
            },
            {
                label: 'Price Low to High',
                value: 'price',
                icon: 'pi pi-sort-amount-up',
            },
        ];
    }
    ngDoCheck(): void {
        let categoriesFilters: SelectItem[] = this.categories.map(
            (category) => {
                return {
                    label: category.name,
                    value: category.name,
                    icon: category.imageUri,
                };
            }
        );
        let brandsFilters: SelectItem[] = this.brands.map((brand) => {
            return {
                label: brand.name,
                value: brand.name,
                icon: brand.imageUri,
            };
        });

        this.filterGroup = [
            {
                label: 'Categories',
                value: 'category',
                items: categoriesFilters,
                icon: 'pi pi-fw pi-tags',
            },
            {
                label: 'Brands',
                value: 'brand',
                items: brandsFilters,
                icon: 'pi pi-fw pi-hashtag',
            },
        ];

        console.log('Total  Records: ' + this.totalRecords);
    }

    getAllBrands() {
        this.loading = true;
        this.brandService.getAllBrands().subscribe(
            (response: any) => {
                console.log(response);
                this.brands = response as Brand[];
                this.loading = false;
            },
            (error) => {
                alert(error.message);
                this.loading = false;
            }
        );
    }

    getAllCategories() {
        this.loading = true;
        this.categoryService.getAllCategories().subscribe(
            (response: any) => {
                console.log(response);
                this.categories = response as Category[];
                this.loading = false;
            },
            (error) => {
                alert(error.message);
                this.loading = false;
            }
        );
    }

    getAllProducts() {
        this.loading = true;
        this.productService.getProductsByAPI().subscribe((response: any) => {
            console.log('inside getAllProducts in products.component.ts');
            console.log(response);

            this.products = response.content as Product[];
            this.totalRecords = response.totalElements;
            this.loading = false;
            console.log(response);
        });
    }

    onSortChange(event: any) {
        const value = event.value;
        console.log('onSortChange', value);

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
        this.onPageChange({ first: 0, rows: 9 });
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    onEdit(event: any) {
        console.log(event);
    }

    filteringOptions(event: any) {
        let selectedGroups = event as SelectedGroups;
        console.log('selectedGroups', selectedGroups);
        this.filterString = '';
        for (const [filterType, filterItems] of Object.entries(
            selectedGroups
        )) {
            console.log('Filter Type:' + filterType);
            console.log('Filter items:' + filterItems.toString());
            filterItems.forEach((item, index) => {
                this.filterString += `${filterType}=${item.value}`;
                if (index != filterItems.length - 1) {
                    this.filterString += '&';
                }
            });
            // this.filterString += `${filterType}=${filterItems
            //     .map((item) => item.value)
            //     .join(',')}`;
            // add & after each += but if this is the last element don't add &
            if (
                filterType !==
                Object.keys(selectedGroups)[
                    Object.keys(selectedGroups).length - 1
                ]
            ) {
                this.filterString += '&';
            }
        }

        console.log('filterString', this.filterString);

        this.productService.getProductsByFilter(this.filterString).subscribe(
            (response: any) => {
                console.log(response);
                this.products = response.content as OldProduct[];
                this.totalRecords = response.totalElements;
                this.first = 0;
                this.rows = 9;
            },
            (error) => {
                alert(error.message);
            }
        );
    }
    onPageChange(event: any) {
        console.log('onPageChange');
        this.loading = true;
        console.log(event);

        this.first = event.first;
        this.rows = event.rows;

        let page = `page=${this.first / this.rows}&size=${this.rows}`;
        let sort = ``;
        if (this.sortField !== '') {
            sort = `sort=${this.sortField},${
                this.sortOrder === 1 ? 'asc' : 'desc'
            }`;
        }

        console.log('page', page);
        console.log('sort', sort);

        // console.log('filterString', filterString);
        let fullFilter = '';

        if (this.filterString !== '') {
            fullFilter += this.filterString;
        }
        if (page !== '' && fullFilter !== '') {
            fullFilter += '&' + page;
        } else if (page !== '') {
            fullFilter += page;
        }
        if (sort !== '') {
            fullFilter += '&' + sort;
        }

        console.log(' full filter' + fullFilter);

        this.productService.getProductsByFilter(fullFilter).subscribe(
            (response: any) => {
                console.log(response);
                this.products = response.content as OldProduct[];
                this.totalRecords = response.totalElements;
                this.loading = false;
            },
            (error) => {
                alert(error.message);
                this.loading = false;
            }
        );
    }
}
