import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Customerlist } from './customer/customerlist/customerlist';
import { Addcustomer } from './customer/addcustomer/addcustomer';

export const routes: Routes = [
    {
        path:'',component:Home
    },
    {
        path:'customer',component:Customerlist
    },
    {
        path:'addcustomer',component:Addcustomer
    },
    {
        path:'editcustomer/:id',component:Addcustomer
    }
];
