import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { SearchresultComponent } from './routes/searchresult/searchresult.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';

import { NewProductComponent } from './routes/admin/new-product/new-product.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { CartComponent } from './routes/cart/cart.component';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './routes/admin/admin-dashboard/admin-dashboard.component';
import { CategoriesComponent } from './routes/categories/categories.component';
import { AdminCategoriesComponent } from './routes/admin/admin-categories/admin-categories.component';
import { NewCategoryComponent } from './routes/admin/new-category/new-category.component';
import { MyFavoritesComponent } from './routes/my-favorites/my-favorites.component';
import { LoginComponent } from './routes/login/login.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { NewsComponent } from './routes/news/news.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'products/:slug', component: ProductDetailsComponent },
      { path: 'search', component: SearchresultComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'news', component: NewsComponent },
      { path: 'categories/:slug', component: CategoriesComponent },
      { path: 'favorites', component: MyFavoritesComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'products', component: AdminDashboardComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products/new', component: NewProductComponent },
      { path: 'categories/new', component: NewCategoryComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
