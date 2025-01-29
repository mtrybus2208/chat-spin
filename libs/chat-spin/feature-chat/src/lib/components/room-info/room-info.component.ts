import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-room-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-info.component.html',
})
export class RoomInfoComponent {
  public title = input('Chat Room');
  public btnLabel = input('Leave Chat');
}
