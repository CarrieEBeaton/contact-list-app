import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

// Routing should be to the container component where it interacts with the store and fetches the data - The contact module
// routes to the ContactContainerComponent

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
  // It uses lazy loading to load the contact feature dependencies.
  path: 'contacts',
  loadChildren: './contacts/contact.module#ContactModule'
},
{
  // Routing redirects to an error page when the page the route is not found.  
  path: '**',
  redirectTo: '/not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
