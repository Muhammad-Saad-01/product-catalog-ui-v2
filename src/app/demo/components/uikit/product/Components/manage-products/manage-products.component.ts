import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Category } from 'src/app/demo/api/Category';
import { Brand } from 'src/app/demo/api/Brand';
import { BrandService } from 'src/app/demo/service/brand.service';
import { CategoryService } from 'src/app/demo/service/category.service';

interface SelectedGroups {
    [groupLabel: string]: SelectItem[]; // Replace 'any' with the actual type of your filter items
}
interface CustomeSelectItemGroup extends SelectItemGroup {
    imgUri?: string;
    icon?: string;
}
@Component({
    templateUrl: './manage-products.component.html',
    providers: [MessageService],
})
export class ManageProductsComponent implements OnInit, DoCheck {
    productDialog: boolean = false;
    addNewProductDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    editProductDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];
    loading = false;
    sortOptions: SelectItem[] = [];
    display: boolean = false;
    sortOrder: number = 0;

    sortField: string = '';
    categories: Category[] = [];
    categoriesNames: string[] = [];
    brands: Brand[] = [];
    brandsNames: string[] = [];
    filterGroup!: CustomeSelectItemGroup[];
    activeOptions: boolean[] = [];
    totalRecords = 0;

    first: number = 0;

    filterString: string = '';
    rows: number = 10;

    statuses: any[] = [];
    uploadedFile: any;
    rowsPerPageOptions = [10, 15, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private brandService: BrandService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.getAllProducts();
        this.getAllCategories();
        this.getAllBrands();
        this.cols = [
            { field: 'name', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'categoryName', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'brandName', header: 'Brand' },
            { field: 'description', header: 'Description' },
        ];

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

    getAllBrands() {
        this.loading = true;
        this.brandService.getAllBrands().subscribe((response: any) => {
            console.log(response);
            this.brands = response as Brand[];

            this.loading = false;
        });
    }

    getAllCategories() {
        this.loading = true;
        this.categoryService.getAllCategories().subscribe((response: any) => {
            console.log(response);
            this.categories = response as Category[];

            console.log('Categories Names', this.categoriesNames);

            this.loading = false;
        });
    }

    ngDoCheck(): void {
        console.log('ngDoCheck');
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
        this.categoriesNames = this.categories.map((category) => {
            return category.name;
        });
        this.brandsNames = this.brands.map((brand) => {
            return brand.name;
        });
        this.activeOptions = [true, false];
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

    getAllProducts() {
        this.loading = true;
        this.productService.getProductsByAPI().subscribe(
            (response: any) => {
                console.log(response);
                this.products = response.content as Product[];
                console.log('Total Elements: ' + response.totalElements);

                this.totalRecords = response.totalElements;
                this.loading = false;
            },
            (error) => {
                alert(error.message);
                this.loading = false;
            }
        );
        console.log('Total  Records: ' + this.totalRecords);
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.addNewProductDialog = true;
    }
    editSelectedProduct() {
        this.editProductDialog = true;
        this.product = { ...this.selectedProducts[0] };
        this.submitted = false;
    }
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.editProductDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;

        this.selectedProducts.forEach((product) => {
            this.productService.deleteProduct(product.id).subscribe(
                (response) => {
                    console.log(response);
                    product.active = false;
                    this.products[this.findIndexById(product.id)] = product;
                    this.products = [...this.products];
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: `${product.id} - ${product.name} Deleted`,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error while deleting product',
                        life: 3000,
                    });
                }
            );
        });

        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.productService.deleteProduct(this.product.id).subscribe(
            (response) => {
                console.log(response);
                this.product.active = false;
                this.products[this.findIndexById(this.product.id)] =
                    this.product;
                this.products = [...this.products];

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: `${this.product.id} - ${this.product.name} Deleted`,
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error while deleting product',
                    life: 3000,
                });
            }
        );
        this.product = {};
    }

    hideEditProductDialog() {
        this.editProductDialog = false;
        this.submitted = false;
    }
    hideAddNewProductDialog() {
        this.addNewProductDialog = false;
        this.submitted = false;
    }
    saveProduct() {
        this.submitted = true;
        console.log('Product :', this.product);

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] =
                    this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: `${this.product.name} Updated`,
                    life: 3000,
                });
            } else {
                this.product.productCode = this.createId();

                this.productService.saveProduct(this.product).subscribe(
                    (response: any) => {
                        this.product.id = response as number;
                        this.products.push(this.product);
                        this.products = [...this.products];
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: `${this.product.name} has been created`,
                            life: 3000,
                        });
                        this.addNewProductDialog = false;
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: ` Error while creating ${this.product.name}`,
                            life: 3000,
                        });
                    }
                );
            }

            this.product = {};
        }
    }
    editSelectedProductItem() {
        console.log('Edit Selected Product Item');
        console.log(this.product);

        this.productService.updateProduct(this.product).subscribe(
            (response) => {
                console.log(response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: `${this.product.name} has been updated`,
                    life: 3000,
                });
                this.products[this.findIndexById(this.product.id)] =
                    this.product;
                this.products = [...this.products];
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `${this.product.name} error while updating ${error}`,
                    life: 3000,
                });
            }
        );
        this.editProductDialog = false;
        this.submitted = true;
    }
    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    importCSV(event) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Data Imported',
            life: 3000,
        });
        this.uploadedFile = event.file;
        console.log(event);
        console.log(event.files[0]);
    }

    onImportError(event) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while importing CSV',
            life: 3000,
        });
        console.log(event);
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
                this.products = response.content as Product[];
                this.totalRecords = response.totalElements;
                this.loading = false;
            },
            (error) => {
                alert(error.message);
                this.loading = false;
            }
        );
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
                this.products = response.content as Product[];
                this.totalRecords = response.totalElements;
                this.first = 0;
                this.rows = 9;
            },
            (error) => {
                alert(error.message);
            }
        );
    }
    onSortChange(event: any) {
        this.sortField = event.field;
        this.sortOrder = event.order;
        console.log('onSortChange', event);

        this.onPageChange({ first: this.first, rows: this.rows });
    }
}
