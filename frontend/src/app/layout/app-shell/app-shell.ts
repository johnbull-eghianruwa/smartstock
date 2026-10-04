import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
    selector: 'app-shell',
    imports: [
        RouterOutlet,
        Topbar,
        Sidebar
    ],
    templateUrl: './app-shell.html',
    styleUrl: './app-shell.scss'
})

export class AppShellComponent {
    sidebarOpen = false;
    toggleSidebar(): void {
        this.sidebarOpen = !this.sidebarOpen;
    }
    closeSidebar(): void {
        this.sidebarOpen = false;
    }

}