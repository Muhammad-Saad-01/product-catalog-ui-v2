interface InventoryStatus {
    label?: string;
    value?: string;
}
export interface Product {
    id?: number;
    name?: string;
    description?: string;
    categoryName?: string;
    price?: number;
    imageUri?: string;
    stock?: number;
    brandName?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    productCode?: string;
    inventoryStatus?: string;
    rating?: number;
}
