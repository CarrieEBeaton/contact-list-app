import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [{
  path: '', pathMatch: 'full', redirectTo: 'home'
},
{
  path: 'home',
  component: HomePageComponent
},
{
  path: 'not-found',
  component: ErrorPageComponent
},
{
  path: 'contacts',
  loadChildren: './contacts/contact.module#ContactModule'
},
{
  path: '**',
  redirectTo: '/not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
