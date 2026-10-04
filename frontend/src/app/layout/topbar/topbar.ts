import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-topbar',
    imports: [MatIconModule],
    templateUrl: './topbar.html',
    styleUrl: './topbar.scss',
})
export class Topbar {
    @Output() menuToggle = new EventEmitter<void>();
    onMenuToggle(): void {
        this.menuToggle.emit();
    }

}