import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactContainerComponent } from './containers/contact-container/contact-container.component';
import { SearchPipe } from './pipes/search.pipe';
import { ContactEffects } from './services/store/effects/contact.effects';
import { contactReducers } from './services/store/reducers/contact.reducer';
import { ContactEditContainerComponent } from './containers/contact-edit-container/contact-edit-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule, 
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature('contacts', contactReducers),
        EffectsModule.forFeature([ContactEffects]),
        ContactRoutingModule,
        SharedModule
    ],
    declarations: [
        ContactContainerComponent,
         ContactListComponent, 
         SearchPipe, 
         ContactEditComponent, ContactEditContainerComponent
        ]
})
export class ContactModule { }