import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactContainerComponent } from "./containers/contact-container/contact-container.component";
import { ContactEditContainerComponent } from './containers/contact-edit-container/contact-edit-container.component';

// Creating feature modules creates clear boundaries for UI components and allows for isolation and lazy loading.
// Lazy loading allows code to be loaded on demand when a user routes to the feature module. This decreases the initial application load time.
export const routes: Routes = [
    {
        path: '',
        component: ContactContainerComponent
    },
    {
        path: 'create/:id',
        component: ContactEditContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {}