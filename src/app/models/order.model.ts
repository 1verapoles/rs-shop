import { Product } from "./product.model";

export interface Order {
    "items": Product[],
    "details": {
        "name": string,
        "address": string,
        "phone": string,
        "timeToDeliver": string,
        "comment": string
    },
    "id"?: string,
    "cartTotal"?: number
}
