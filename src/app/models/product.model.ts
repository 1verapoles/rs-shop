export interface Product {
    "id": string,
    "name": string,
    "imageUrls": string[],
    "availableAmount": number,
    "price": number,
    "rating": number,
    "description": string,
    "isInCart"?: boolean,
    "isFavorite"?: boolean,
    "category"?: string,
    "subCategory"?: string,
    "total"?: number,
    "orderQty"?: number
}
