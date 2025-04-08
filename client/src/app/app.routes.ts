import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { SearchresultComponent } from './routes/searchresult/searchresult.component';
import { BasketComponent } from './routes/basket/basket.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { ProductsComponent } from './routes/admin/products/products.component';
import { NewProductComponent } from './routes/admin/new-product/new-product.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'products/:slug', component: ProductDetailsComponent},
    {path:'search', component: SearchresultComponent},
    {path:'basket', component: BasketComponent},
    {path:'checkout', component: CheckoutComponent},
    {path:'admin/products', component: ProductsComponent},
    {path:'admin/products/new', component: NewProductComponent},
    {path:'**', component: NotFoundComponent}
];
