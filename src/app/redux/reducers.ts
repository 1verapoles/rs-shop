import { Action, createReducer, on } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import * as ProductsActions from './actions';

export interface State {
  products: Product[];
  user: User,
  categories: Category[]
}

export const initialState: State = {
  products: [],
  categories: [],
  user: {
    "cart": [], "favorites": [], "orders": [
      {
        cartTotal: 594.31,
        details: {
          address: "fgv",
          comment: "hf",
          name: "vnd",
          phone: "+8",
          timeToDeliver: "2021-09-21 12:33"
        },
        id: "2",
        items: [{
          availableAmount: 11,
          category: "electronics",
          description: "aute commodo laboris minim veniam duis velit reprehenderit laboris aliqua cillum pariatur anim officia quis aliqua excepteur dolor laboris reprehenderit labore ipsum sunt aliqua elit consectetur do excepteur eu elit magna eu est ullamco non commodo sint cupidatat commodo fugiat",
          id: "612e05c5f00b2207b3dfba3b",
          imageUrls: [
            "https://cdn21vek.by/img/galleries/390/365/preview_b/tm204_texet_02_57e3c5352af48.jpeg",
            "https://cdn21vek.by/img/galleries/390/365/preview_b/tm204_texet_02_57e3c4f3c0a1a.jpeg",
            "https://cdn21vek.by/img/galleries/390/365/preview_b/tm204_texet_02_57e3c534abdcc.jpeg"],
          isFavorite: false,
          isInCart: true,
          name: "Мобильный телефон Texet TM-204 (красный)",
          orderQty: 1,
          price: 594.31,
          rating: 3,
          subCategory: "mobile",
          total: 594.31
        }]
      }
    ]
  }
};

const youtubeReducer = createReducer(
  initialState,
  on(ProductsActions.addProductToFavorite, (state, { product }) => {
    return {
      ...state,
      user: {
        ...state.user,
        "favorites": [...state.user.favorites, { ...product, isFavorite: true }],
        "cart": [...state.user.cart].map(el => {
          if (el.id === product.id) {
            return {
              ...el,
              isFavorite: true
            }
          } else {
            return el;
          }
        })
      },
      products: state.products.map(products => ({ ...products }))
        .map(goods => {
          if (goods.id === product.id) {
            return {
              ...goods,
              isFavorite: true
            }
          } else {
            return goods;
          }
        })
    };
  }),
  on(ProductsActions.deleteProductFromFavorite, (state, { product }) => {
    return {
      ...state,
      user: { ...state.user, "favorites": [...state.user.favorites].filter(el => el.id !== product.id) },
      products: state.products.map(products => ({ ...products }))
        .map(goods => {
          if (goods.id === product.id) {
            return {
              ...goods,
              isFavorite: false
            }
          } else {
            return goods;
          }
        })
    };
  }),
  on(ProductsActions.addProductToCart, (state, { product }) => {
    return {
      ...state,
      user: {
        ...state.user,
        "cart": [...state.user.cart, { ...product, isInCart: true, total: product.price, orderQty: 1 }],
        "favorites": [...state.user.favorites].map(el => {
          if (el.id === product.id) {
            return {
              ...el,
              isInCart: true
            }
          } else {
            return el;
          }
        })
      },
      "products": state.products.map(products => ({ ...products }))
        .map(goods => {
          if (goods.id === product.id) {
            return {
              ...goods,
              isInCart: true
            }
          } else {
            return goods;
          }
        })
    };
  }),
  on(ProductsActions.deleteProductFromCart, (state, { product }) => {
    return {
      ...state,
      user: { ...state.user, "cart": [...state.user.cart].filter(el => el.id !== product.id) },
      products: state.products.map(products => ({ ...products }))
        .map(goods => {
          if (goods.id === product.id) {
            return {
              ...goods,
              isInCart: false
            }
          } else {
            return goods;
          }
        })
    };
  }),
  on(ProductsActions.deleteOrder, (state, { order }) => {
    const ids = order.items.map(item => item.id);
    return {
      ...state,
      //@ts-ignore
      user: { ...state.user, "orders": [...state.user.orders].filter(el => el.id !== order.id) },
      products: state.products.map(products => ({ ...products }))
        .map(goods => {
          if (ids.includes(goods.id)) {
            const orderAmount = order.items.find(el => el.id === goods.id)?.orderQty || 0;
            return {
              ...goods,
              availableAmount: goods.availableAmount + orderAmount
            }
          } else {
            return goods;
          }
        })
    };
  }),
  on(ProductsActions.changeQty, (state, { product }) => {
    return {
      ...state,
      user: {
        ...state.user, "cart": [...state.user.cart]
          .map(goods => {
            if (goods.id === product.id) {
              return product;
            } else {
              return goods;
            }
          })
      }
    }
  }),
  on(ProductsActions.addAllProducts, (state, { products }) => ({ ...state, products: products })),
  on(ProductsActions.addCategories, (state, { categories }) => { return { ...state, categories: categories }; }),
  on(ProductsActions.addUser, (state, { user }) => ({ ...state, user: user })),
  on(ProductsActions.addOrder, (state, { order }) => {
    const ids = order.items.map(item => item.id);
    return {
      ...state,
      user: {
        ...state.user,
        "cart": [],
        "orders": state.user.orders?.concat(order),
        "favorites": [...state.user.favorites].map(el => {
          if (ids.includes(el.id)) {
            return {
              ...el,
              isInCart: false
            }
          } else {
            return el;
          }
        })
      },
      "products": state.products.map(products => ({ ...products }))
        .map(goods => {
          if (ids.includes(goods.id)) {
            const orderAmount = order.items.find(el => el.id === goods.id)?.orderQty || 0;
            return {
              ...goods,
              isInCart: false,
              availableAmount: goods.availableAmount - orderAmount
            }
          } else {
            return goods;
          }
        })
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return youtubeReducer(state, action);
}