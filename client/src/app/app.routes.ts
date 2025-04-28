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


export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:slug', component: ProductDetailsComponent },
      { path: 'search', component: SearchresultComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {path:'products', component: AdminDashboardComponent},
        { path: 'products/new', component: NewProductComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }
];
