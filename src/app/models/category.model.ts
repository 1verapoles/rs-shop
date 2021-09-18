import { Order } from "./order.model";
import { Product } from "./product.model";

export interface SubCategory {
    "id": string,
    "name": string
}

export interface Category {
    "id": string,
    "name": string,
    "img"?: string,
    "subCategories": SubCategory[]
}
