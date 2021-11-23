import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { BullsComponent } from 'src/app/pages/bulls/bulls.component';
import { CalvesComponent } from 'src/app/pages/calves/calves.component';


import { CowsComponent } from 'src/app/pages/cows/cows.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { FertilizersComponent } from 'src/app/pages/fertilizers/fertilizers.component';
import { FuelconsumptionComponent } from 'src/app/pages/fuelconsumption/fuelconsumption.component';
import { MilksalesComponent } from 'src/app/pages/milksales/milksales.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ProvendersComponent } from 'src/app/pages/provenders/provenders.component';
import { SheepsComponent } from 'src/app/pages/sheeps/sheeps.component';

export const AdminLayoutRoutes: Routes = [

    { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
    { path: 'cows', component: CowsComponent, canActivate: [LoginGuard] },
    { path: 'calves', component: CalvesComponent, canActivate: [LoginGuard] },
    { path: 'bulls', component: BullsComponent, canActivate: [LoginGuard] },
    { path: 'sheeps', component: SheepsComponent, canActivate: [LoginGuard] },
    { path: 'provenders', component: ProvendersComponent, canActivate: [LoginGuard] },
    { path: 'fertilizers', component: FertilizersComponent, canActivate: [LoginGuard] },
    { path: 'fuelconsumption', component: FuelconsumptionComponent, canActivate: [LoginGuard] },
    { path: 'milksales', component: MilksalesComponent, canActivate: [LoginGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [LoginGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:  'profile',component: ProfileComponent}

];
