import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-demo-standalone',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './demo-standalone.component.html',
    styleUrls: ['./demo-standalone.component.less'],
})
export class DemoStandaloneComponent {}
