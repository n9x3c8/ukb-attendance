import { NgModule } from '@angular/core';

import { SliceReasonPipe } from './slice-reason.pipe';

@NgModule({
    declarations: [SliceReasonPipe],
    exports: [SliceReasonPipe]
})
export class CustomPipeModule {}
