import { RouterModule, Routes } from '@angular/router';
import { ProductUrl } from './product.url';
import { ProductsComponent } from './components/products/products.component';
import { AuthenticationGuard } from '../guard.services/authentication.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { IRoleAccount } from '../interfaces/role';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const RouteLists: Routes = [
    { path: '', redirectTo: ProductUrl.Products, pathMatch: 'full' },
    {
        path: ProductUrl.Products,
        component: ProductsComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ProductUrl.AddProduct,
        component: AddProductComponent, 
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ProductUrl.DetailProduct,
        children: [
            { path: '', component: ProductsComponent },
            { path: ':id', component: DetailProductComponent}
        ],
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ProductUrl.UpdateProduct,
        children: [
            { path: '', component: ProductsComponent },
            { path: ':id', component: UpdateProductComponent }
        ],
        data: { role: [IRoleAccount.Admin] }
    }
];
export const ProductRounting = RouterModule.forChild(RouteLists);
