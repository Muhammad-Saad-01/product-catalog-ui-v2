import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getAllCategories() {
        return this.http.get(environment.baseApiUrl + 'categories');
    }

    getCategoryById(id: number) {
        return this.http.get(environment.baseApiUrl + 'categories/' + id);
    }

    addCategory(category: any) {
        return this.http.post(environment.baseApiUrl + 'categories', category);
    }

    toggleCategoryStatus(category: any) {
        return this.http.put(environment.baseApiUrl + 'categories', category);
    }
}
