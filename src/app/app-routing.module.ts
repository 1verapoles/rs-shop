import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { DetailsComponent } from './components/details/details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'goods/category/:categoryId', component: CategoriesComponent, pathMatch: 'full' },
  { path: 'goods/category/:categoryId/:subCategoryId', component: SubcategoryComponent },
  { path: 'goods/item/:itemId', component: DetailsComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegistrationComponent },
  { path: 'users/favorites', component: FavoritesComponent },
  { path: 'users/cart', component: CartComponent },
  { path: 'users/order', component: OrderComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }