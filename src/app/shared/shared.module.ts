import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    imports: [
        NgbModule,
        CommonModule
    ],
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class SharedModule { }