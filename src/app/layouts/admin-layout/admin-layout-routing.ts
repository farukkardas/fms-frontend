import { Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AnimalsalesComponent } from 'src/app/pages/animalsales/animalsales.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { BasketComponent } from 'src/app/pages/basket/basket.component';
import { BullsComponent } from 'src/app/pages/bulls/bulls.component';
import { BuyproductComponent } from 'src/app/pages/buyproduct/buyproduct.component';
import { CalvesComponent } from 'src/app/pages/calves/calves.component';


import { CowsComponent } from 'src/app/pages/cows/cows.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { FertilizersComponent } from 'src/app/pages/fertilizers/fertilizers.component';
import { FuelconsumptionComponent } from 'src/app/pages/fuelconsumption/fuelconsumption.component';
import { MilksalesComponent } from 'src/app/pages/milksales/milksales.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ProvendersComponent } from 'src/app/pages/provenders/provenders.component';
import { SheepsComponent } from 'src/app/pages/sheeps/sheeps.component';

export const AdminLayoutRoutes: Routes = [

    { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
    { path: 'cows', component: CowsComponent, canActivate: [AdminGuard] },
    { path: 'calves', component: CalvesComponent, canActivate: [AdminGuard] },
    { path: 'bulls', component: BullsComponent, canActivate: [AdminGuard] },
    { path: 'sheeps', component: SheepsComponent, canActivate: [AdminGuard] },
    { path: 'provenders', component: ProvendersComponent, canActivate: [AdminGuard] },
    { path: 'fertilizers', component: FertilizersComponent, canActivate: [AdminGuard] },
    { path: 'fuelconsumption', component: FuelconsumptionComponent, canActivate: [AdminGuard] },
    { path: 'milksales', component: MilksalesComponent, canActivate: [AdminGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard] },
    { path: 'animalsales', component: AnimalsalesComponent, canActivate: [AdminGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard] },
    { path: 'listedproducts', component: ProductsComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
    { path: 'buyproduct', component: BuyproductComponent, canActivate: [LoginGuard] },
    { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [LoginGuard] },
    { path: 'basket', component: BasketComponent, canActivate: [LoginGuard] }

];
