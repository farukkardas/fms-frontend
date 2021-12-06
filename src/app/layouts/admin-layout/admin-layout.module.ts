import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout-routing';
import { CalvesComponent } from 'src/app/pages/calves/calves.component';
import { CowsComponent } from 'src/app/pages/cows/cows.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CowAddComponent } from 'src/app/entries/cow-add/cow-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CowDeleteComponent } from 'src/app/entries/cow-delete/cow-delete.component';
import { MatSelectModule } from '@angular/material/select';
import { CowUpdateComponent } from 'src/app/entries/cow-update/cow-update.component';
import { CalfAddComponent } from 'src/app/entries/calf-add/calf-add.component';
import { MatInputModule } from '@angular/material/input';
import { CalfDeleteComponent } from 'src/app/entries/calf-delete/calf-delete.component';
import { CalfUpdateComponent } from 'src/app/entries/calf-update/calf-update.component';
import { BullsComponent } from 'src/app/pages/bulls/bulls.component';
import { BullAddComponent } from 'src/app/entries/bull-add/bull-add.component';
import { BullDeleteComponent } from 'src/app/entries/bull-delete/bull-delete.component';
import { BullUpdateComponent } from 'src/app/entries/bull-update/bull-update.component';
import { SheepAddComponent } from 'src/app/entries/sheep-add/sheep-add.component';
import { SheepUpdateComponent } from 'src/app/entries/sheep-update/sheep-update.component';
import { SheepDeleteComponent } from 'src/app/entries/sheep-delete/sheep-delete.component';
import { SheepsComponent } from 'src/app/pages/sheeps/sheeps.component';
import { ProvendersComponent } from 'src/app/pages/provenders/provenders.component';
import { ProvenderAddComponent } from 'src/app/entries/provender-add/provender-add.component';
import { ProvenderDeleteComponent } from 'src/app/entries/provender-delete/provender-delete.component';
import { ProvenderUpdateComponent } from 'src/app/entries/provender-update/provender-update.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { FertilizersComponent } from 'src/app/pages/fertilizers/fertilizers.component';
import { FuelconsumptionComponent } from 'src/app/pages/fuelconsumption/fuelconsumption.component';
import { FertilizerAddComponent } from 'src/app/entries/fertilizer-add/fertilizer-add.component';
import { FertilizerUpdateComponent } from 'src/app/entries/fertilizer-update/fertilizer-update.component';
import { FertilizerDeleteComponent } from 'src/app/entries/fertilizer-delete/fertilizer-delete.component';
import { FuelAddComponent } from 'src/app/entries/fuel-add/fuel-add.component';
import { FuelUpdateComponent } from 'src/app/entries/fuel-update/fuel-update.component';
import { FuelDeleteComponent } from 'src/app/entries/fuel-delete/fuel-delete.component';
import { MilksalesComponent } from 'src/app/pages/milksales/milksales.component';
import { MilksaleAddComponent } from 'src/app/entries/milksale-add/milksale-add.component';
import { MilksaleUpdateComponent } from 'src/app/entries/milksale-update/milksale-update.component';
import { MilksaleDeleteComponent } from 'src/app/entries/milksale-delete/milksale-delete.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { CustomerAddComponent } from 'src/app/entries/customer-add/customer-add.component';
import { CustomerDeleteComponent } from 'src/app/entries/customer-delete/customer-delete.component';
import { CustomerUpdateComponent } from 'src/app/entries/customer-update/customer-update.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NotfoundfComponent } from 'src/app/pages/notfoundf/notfoundf.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserUpdateComponent } from 'src/app/entries/user-update/user-update.component';
import { AnimalsalesComponent } from 'src/app/pages/animalsales/animalsales.component';
import { AnimalsalesAddComponent } from 'src/app/entries/animalsales-add/animalsales-add.component';
import { AnimalsalesDeleteComponent } from 'src/app/entries/animalsales-delete/animalsales-delete.component';
import { AnimalsalesUpdateComponent } from 'src/app/entries/animalsales-update/animalsales-update.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductAddComponent } from 'src/app/entries/product-add/product-add.component';


@NgModule({
  declarations: [
    CalvesComponent,
    CowsComponent,
    BullsComponent,
    SheepsComponent,
    ProvendersComponent,
    FertilizersComponent,
    FuelconsumptionComponent,
    MilksalesComponent,
    CustomersComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OrdersComponent,
    NotfoundfComponent,
    ProfileComponent,
    CowAddComponent,
    CowDeleteComponent,
    CowUpdateComponent,
    CalfAddComponent,
    CalfDeleteComponent,
    CalfUpdateComponent,
    BullAddComponent,
    BullDeleteComponent,
    BullUpdateComponent,
    SheepAddComponent,
    SheepUpdateComponent,
    SheepDeleteComponent,
    ProductsComponent,
    ProductAddComponent,
    ProvenderAddComponent,
    ProvenderDeleteComponent,
    ProvenderUpdateComponent,
    FertilizerAddComponent,
    FertilizerUpdateComponent,
    FertilizerDeleteComponent,
    FuelAddComponent,
    FuelUpdateComponent,
    FuelDeleteComponent,
    MilksaleAddComponent,
    MilksaleUpdateComponent,
    MilksaleDeleteComponent,
    CustomerAddComponent,
    CustomerDeleteComponent,
    CustomerUpdateComponent,
    SearchFilterPipe,
    UserUpdateComponent,
    AnimalsalesComponent,
    AnimalsalesAddComponent,
    AnimalsalesDeleteComponent,
    AnimalsalesUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgxChartsModule,
    MatProgressBarModule


  ], providers: [
    [CookieService],
    [CryptoKey],
    [LoginComponent]

  ]
})
export class AdminLayoutModule { }
