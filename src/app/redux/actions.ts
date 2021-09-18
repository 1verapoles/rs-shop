import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export const addAllProducts = createAction(
  'all products',
  props<{ products: Product[] }>()
);

export const addCategories = createAction(
  'add categories',
  props<{ categories: Category[] }>()
);

export const addProductToFavorite = createAction(
  'add to favorite',
  props<{ product: Product }>()
);

export const deleteProductFromFavorite = createAction(
  'delete from favorite',
  props<{ product: Product }>()
);

export const deleteProductFromCart = createAction(
  'delete from cart',
  props<{ product: Product }>()
);

export const deleteOrder = createAction(
  'delete order',
  props<{ order: Order }>()
);

export const changeQty = createAction(
  'change quantity in cart',
  props<{ product: Product }>()
);

export const addOrder = createAction(
  'add order',
  props<{ order: Order }>()
);

// export const increaseQty = createAction(
//   'increase quantity in cart',
//   props<{ product: Product }>()
// );

// export const addProductToCart = createAction(
//   'add to cart',
//   props<{ id: string }>()
// );

export const addProductToCart = createAction(
  'add to cart',
  props<{ product: Product }>()
);

export const addUser = createAction(
  'add user',
  props<{ user: User }>()
);

// export const addProductToUserFavorite = createAction(
//   'add to user favourite',
//   props<{ product: Product }>()
// );

// export const addProductToUserCart = createAction(
//   'add to user cart',
//   props<{ product: Product }>()
// );