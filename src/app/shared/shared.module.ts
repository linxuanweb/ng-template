import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedCompComponent } from './components/shared-comp/shared-comp.component';
import { SharedDirectiveDirective } from './directives/shared-directive.directive';
import { SharedPipePipe } from './pipes/shared-pipe.pipe';

// Warning: Only add necessary modules here. Do not add modules that are not used by all components in this module.
@NgModule({
    declarations: [SharedCompComponent, SharedDirectiveDirective, SharedPipePipe],
    imports: [CommonModule],
})
export class SharedModule {}
