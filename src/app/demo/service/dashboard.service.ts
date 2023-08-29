import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getNumberOfProducts() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/products/count'
        );
    }
    getNumberOfCategories() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/categories/count'
        );
    }
    getNumberOfBrands() {
        return this.http.get(environment.baseApiUrl + 'dashboard/brands/count');
    }
    getNumberOfActiveProducts() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/products/count?active=true'
        );
    }
    getNumberOfActiveCategories() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/categories/count?active=true'
        );
    }
    getNumberOfActiveBrands() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/brands/count?active=true'
        );
    }
    getNumberOfInactiveProducts() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/products/count?active=false'
        );
    }
    getNumberOfInactiveCategories() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/categories/count?active=false'
        );
    }
    getNumberOfInactiveBrands() {
        return this.http.get(
            environment.baseApiUrl + 'dashboard/brands/count?active=false'
        );
    }

    getNumberOfProductsByCategory() {
        return this.http.get(
            environment.baseApiUrl +
                'dashboard/products/numberOfProductsByCategory'
        );
    }
    getNumberOfProductsByBrand() {
        return this.http.get(
            environment.baseApiUrl +
                'dashboard/products/numberOfProductsByBrand'
        );
    }
}
