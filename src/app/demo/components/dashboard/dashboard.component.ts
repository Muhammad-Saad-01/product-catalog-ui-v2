import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Category } from '../../api/Category';
import { Brand } from '../../api/Brand';
import { OldProduct } from '../../api/OldProduct';
import { DashboardService } from '../../service/dashboard.service';

interface simpleProduct {
    id: number;
    name: string;
    price: number;
    NumberOfSales: number;
    category: string;
    brand: string;
}
interface pair {
    key: string;
    value: number;
}
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    totalNumberOfProducts: number = 0;
    totalNumberOfNewProducts: number = 5;
    totalNumberOfCategories: number = 0;

    totalNumberOfBrands: number = 0;
    totalNumberOfActiveProducts: number = 0;
    totalNumberOfInactiveProducts: number = 0;
    totalNumberOfActiveCategories: number = 0;
    totalNumberOfInactiveCategories: number = 0;
    totalNumberOfActiveBrands: number = 0;
    totalNumberOfInactiveBrands: number = 0;

    topFiveSellingProducts: simpleProduct[] = [
        {
            id: 8,
            name: 'Nike Air Max 270 React ENG',
            category: 'Shoes',
            brand: 'Nike',
            price: 100,
            NumberOfSales: 100,
        },
        {
            id: 55,
            name: 'Nike Air Max 95',
            category: 'Shoes',
            brand: 'Nike',
            price: 190,
            NumberOfSales: 90,
        },
        {
            id: 16,
            name: 'Nike Air Max  270 a',
            category: 'Shoes',
            brand: 'Nike',
            price: 100,
            NumberOfSales: 80,
        },
        {
            id: 17,
            name: 'adidas Sportswear Tech Fleece',
            category: 'Sportswear',
            brand: 'adidas',
            price: 100,
            NumberOfSales: 70,
        },
        {
            id: 18,
            name: 'Nike Air Max 270 React ENG',
            category: 'Shoes',
            brand: 'Nike',
            price: 100,
            NumberOfSales: 60,
        },
    ];

    topSellingCategories: any[] = [
        { category: 'Shoes', numberOfSales: 150 },
        { category: 'Sportswear', numberOfSales: 90 },
        { category: 'T-Shirts', numberOfSales: 60 },
        { category: 'Accessories', numberOfSales: 70 },
        { category: 'Jackets', numberOfSales: 50 },
    ];
    topSellingBrands: any[] = [
        { brand: 'Nike', numberOfSales: 150 },
        { brand: 'adidas', numberOfSales: 90 },
        { brand: 'Puma', numberOfSales: 60 },
        { brand: 'Under Armour', numberOfSales: 70 },
        { brand: 'Jordan', numberOfSales: 50 },
    ];

    numberOfProductPerCategory: any[] = [];
    numberOfProductPerBrand: any[] = [];

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private dashboardService: DashboardService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    async ngOnInit() {
        this.initChart();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        await this.getDashboardData();
    }
    async getDashboardData() {
        await this.dashboardService.getNumberOfProducts().subscribe((data) => {
            this.totalNumberOfProducts = data as number;
        });
        await this.dashboardService
            .getNumberOfCategories()
            .subscribe((data) => {
                this.totalNumberOfCategories = data as number;
            });
        await this.dashboardService.getNumberOfBrands().subscribe((data) => {
            this.totalNumberOfBrands = data as number;
        });
        await this.dashboardService
            .getNumberOfActiveProducts()
            .subscribe((data) => {
                this.totalNumberOfActiveProducts = data as number;
            });
        await this.dashboardService
            .getNumberOfActiveCategories()
            .subscribe((data) => {
                this.totalNumberOfActiveCategories = data as number;
            });

        await this.dashboardService
            .getNumberOfInactiveProducts()
            .subscribe((data) => {
                this.totalNumberOfInactiveProducts = data as number;
            });
        await this.dashboardService
            .getNumberOfInactiveCategories()
            .subscribe((data) => {
                this.totalNumberOfInactiveCategories = data as number;
            });
        await this.dashboardService
            .getNumberOfInactiveBrands()
            .subscribe((data) => {
                this.totalNumberOfInactiveBrands = data as number;
            });
        await this.dashboardService
            .getNumberOfActiveBrands()
            .subscribe((data) => {
                this.totalNumberOfActiveBrands = data as number;
            });
        await this.dashboardService
            .getNumberOfProductsByCategory()
            .subscribe((data) => {
                this.numberOfProductPerCategory = data as any[];
            });
        await this.dashboardService
            .getNumberOfProductsByBrand()
            .subscribe((data) => {
                this.numberOfProductPerBrand = data as any[];
            });
        console.log('after retrieving data in dashboard.component.ts');
        console.log(
            'products per cateogries' + this.numberOfProductPerCategory
        );
        console.log('products per brands' + this.numberOfProductPerBrand);
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
