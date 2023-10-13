import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedCompComponent } from './components/shared-comp/shared-comp.component';
import { ScrollObserverDirective } from './directives/scrollObserver.directive';
import { SharedDirectiveDirective } from './directives/shared-directive.directive';
import { OmitPipe } from './pipes/omit.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// Warning: Only add necessary modules here. Do not add modules that are not used by all components in this module.
@NgModule({
    declarations: [SharedCompComponent, SharedDirectiveDirective, OmitPipe, SafeHtmlPipe, ScrollObserverDirective],
    imports: [CommonModule],
})
export class SharedModule {}
