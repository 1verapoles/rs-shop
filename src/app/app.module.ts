import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { reducer } from './redux/reducers';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DetailsComponent } from './components/details/details.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { registerLocaleData } from '@angular/common';
import localeRuBY from '@angular/common/locales/ru-BY';
import { SortPricePipe } from './pipes/sort-price.pipe';
import { SortPopularityPipe } from './pipes/sort-popularity.pipe';
import { AmountDirective } from './directives/amount.directive';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HeaderComponent } from './components/header/header.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { CartComponent } from './components/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CatalogComponent } from './components/catalog/catalog.component';
registerLocaleData(localeRuBY, 'ru-BY');


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DetailsComponent,
    ErrorComponent,
    ProductCardComponent,
    CategoriesComponent,
    SortPricePipe,
    SortPopularityPipe,
    AmountDirective,
    SubcategoryComponent,
    FavoritesComponent,
    HeaderComponent,
    FavoriteCardComponent,
    CartComponent,
    MainComponent,
    OrderComponent,
    LoginComponent,
    RegistrationComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ goods: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-BY' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
