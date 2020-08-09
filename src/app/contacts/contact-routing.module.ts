import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactContainerComponent } from "./containers/contact-container/contact-container.component";
import { ContactEditContainerComponent } from './containers/contact-edit-container/contact-edit-container.component';

const routes: Routes = [
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