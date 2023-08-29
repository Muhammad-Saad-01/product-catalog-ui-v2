import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    constructor(private http: HttpClient) {}

    getAllBrands() {
        return this.http.get(environment.baseApiUrl + 'brands');
    }

    getBrandById(id: number) {
        return this.http.get(environment.baseApiUrl + 'brands/' + id);
    }
}
