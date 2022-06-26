import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FruitComponent } from './fruit/fruit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helper/authGuard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path : '', component : FruitComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }