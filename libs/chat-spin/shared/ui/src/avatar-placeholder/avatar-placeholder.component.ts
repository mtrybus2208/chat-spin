import { Component, computed, inject, input } from '@angular/core';
import { SharedAvatarPlaceholderService } from './services';
import { AVATAR_NAMES } from './avatar-placeholder.model';

@Component({
  selector: 'lib-avatar-placeholder',
  templateUrl: './avatar-placeholder.component.html',
  styleUrls: ['./avatar-placeholder.component.scss'],
  standalone: true,
  providers: [SharedAvatarPlaceholderService],
})
export class AvatarPlaceholderComponent {
  readonly name = input<(typeof AVATAR_NAMES)[number]>(AVATAR_NAMES[0]);

  private readonly avatarPlaceholderService = inject(
    SharedAvatarPlaceholderService
  );

  readonly avatarSrc = computed(
    () => `${this.avatarPlaceholderService.getAvatarSrc(this.name())}`
  );
}
