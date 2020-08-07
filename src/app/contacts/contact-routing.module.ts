import { ContactContainerComponent } from "./containers/contact-container/contact-container.component";
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ContactContainerComponent
    },
    {
        path: 'create',
        component: ContactEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {}