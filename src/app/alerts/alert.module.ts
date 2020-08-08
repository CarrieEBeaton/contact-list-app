import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { AlertOtherComponent } from './alert-other/alert-other.component';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        NgbModule,
        CommonModule
    ],
    declarations: [
        AlertOtherComponent,
        AlertSuccessComponent
    ],
    exports: [
        AlertOtherComponent,
        AlertSuccessComponent
    ]
})
export class AlertModule { }