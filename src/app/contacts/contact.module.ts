import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { contactReducers } from './services/store/reducers/contact.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from './services/store/effects/contact.effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactContainerComponent } from './containers/contact-container/contact-container.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    imports: [
        CommonModule,
        NgbModule, 
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature('contacts', contactReducers),
        EffectsModule.forFeature([ContactEffects]),
        ContactRoutingModule
    ],
    declarations: [ContactContainerComponent, ContactListComponent, SearchPipe]
})
export class ContactModule { }