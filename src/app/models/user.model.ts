import { Order } from "./order.model";
import { Product } from "./product.model";

export interface User {
    "firstName"?: string,
    "lastName"?: string,
    "token"?: string,
    "login"?: string,
    "password"?: string,
    "cart": Product[],
    "favorites": Product[],
    "orders"?: Order[]
}
