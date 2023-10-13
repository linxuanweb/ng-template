import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[appScrollObserver]',
})
export class ScrollObserverDirective implements AfterViewInit, OnDestroy {
    @Input() intersectionOptions: IntersectionObserverInit = {
        rootMargin: '200px 0px',
    };

    @Output() scrolledIntoView = new EventEmitter<void>();

    private observer: IntersectionObserver | null = null;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platoformId: any,
    ) {}

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platoformId)) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.scrolledIntoView.emit();
                    }
                });
            }, this.intersectionOptions);

            this.observer.observe(this.el.nativeElement);
        }
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
