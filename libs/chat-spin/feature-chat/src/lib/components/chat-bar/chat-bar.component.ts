import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bar.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ChatBarComponent {}
