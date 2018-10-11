import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderDetailComponent } from "./components/order-detail/order-detail.component";
import { OrderInsertComponent } from "./components/order-insert/order-insert.component";
import { OrderUpdateComponent } from "./components/order-update/order-update.component";
import { OrderUrl } from "./order.url";
import { IRoleAccount } from "../interfaces/role";

 const RouteLists: Routes = [
    { path: '', redirectTo: OrderUrl.Orders, pathMatch: 'full' },
    { 
        path: OrderUrl.Orders, 
        component:  OrdersComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: OrderUrl.OrderDetail,
        children: [
            {path: '', component: OrdersComponent},
            {path: ':id', component: OrderDetailComponent}
        ],
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: OrderUrl.OrderInsert,
        component: OrderInsertComponent,
        data: { role: [IRoleAccount.Admin] }

    }, 
    {
        path: OrderUrl.OrderUpdate,
        children: [
            { path: '', component: OrdersComponent },
            { path: ':id', component: OrderUpdateComponent}
        ],
        data: { role: [IRoleAccount.Admin] }
    },
]

export const OrderRouting = RouterModule.forChild(RouteLists);
