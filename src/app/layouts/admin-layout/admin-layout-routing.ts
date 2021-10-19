import { Routes } from '@angular/router';
import { BullsComponent } from 'src/app/pages/bulls/bulls.component';
import { CalvesComponent } from 'src/app/pages/calves/calves.component';


import { CowsComponent } from 'src/app/pages/cows/cows.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { FertilizersComponent } from 'src/app/pages/fertilizers/fertilizers.component';
import { FuelconsumptionComponent } from 'src/app/pages/fuelconsumption/fuelconsumption.component';
import { MilksalesComponent } from 'src/app/pages/milksales/milksales.component';
import { ProvendersComponent } from 'src/app/pages/provenders/provenders.component';
import { SheepsComponent } from 'src/app/pages/sheeps/sheeps.component';

export const AdminLayoutRoutes: Routes = [
  {path:'cows',component:CowsComponent},
  {path:'calves',component:CalvesComponent},
  {path:'bulls',component:BullsComponent},
  {path:'sheeps',component:SheepsComponent},
  {path:'provenders',component:ProvendersComponent},
  {path:'fertilizers',component:FertilizersComponent},
  {path:'fuelconsumption',component:FuelconsumptionComponent},
  {path:'milksales',component:MilksalesComponent},
  {path:'customers',component:CustomersComponent}
];
