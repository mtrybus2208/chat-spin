import { Component, input } from '@angular/core';


@Component({
  selector: 'lib-room-info',
  imports: [],
  templateUrl: './room-info.component.html',
})
export class RoomInfoComponent {
  public title = input('Chat Room');
  public btnLabel = input('Leave Chat');
}
