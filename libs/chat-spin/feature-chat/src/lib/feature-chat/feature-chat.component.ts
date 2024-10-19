import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-feature-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-chat.component.html',
  styleUrl: './feature-chat.component.scss',
})
export class FeatureChatComponent {}
