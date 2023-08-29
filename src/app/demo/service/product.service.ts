import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from 'src/environments/environment';
import { OldProduct } from '../api/OldProduct';

@Injectable()
export class ProductService {
    deleteProduct(id: number) {
        return this.http.delete(environment.baseApiUrl + 'products/' + id);
    }
    updateProduct(product: Product) {
        return this.http.put(
            environment.baseApiUrl + 'products/' + product.id,
            product
        );
    }
    constructor(private http: HttpClient) {}

    getProductsSmall() {
        return this.http
            .get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProducts() {
        return this.http
            .get<any>('assets/demo/data/products.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsMixed() {
        return this.http
            .get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsWithOrdersSmall() {
        return this.http
            .get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductById(id: number) {
        return this.http.get(environment.baseApiUrl + 'products/' + id);
    }
    getProductsByFilter(filter: string) {
        let url = environment.baseApiUrl + 'products/filter?' + filter;

        console.log(url);

        let data = this.http.get(url);

        console.log(data);

        return data;
    }

    getProductsByAPI() {
        let url = environment.baseApiUrl + 'products/filter?';
        console.log(url);
        return this.http.get<Product[]>(url);
    }

    saveProduct(product: Product) {
        return this.http.post(environment.baseApiUrl + 'products', product);
    }
}
