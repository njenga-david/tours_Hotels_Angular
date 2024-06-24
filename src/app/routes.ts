import { Routes } from '@angular/router'
import { HomeComponent } from './Tours-Hotel-Page/home.component'; 
import { DetailsComponent } from './details/details.component';
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Home Page"
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    }
];

export default routeConfig;