import { inject, Injectable } from '@angular/core';
import {
  AVATAR_PLACEHOLDER_CONFIG,
  AvatarPlaceholderConfig,
  AVATAR_NAMES,
} from '../avatar-placeholder.model';

@Injectable({
  providedIn: 'root',
})
export class SharedAvatarPlaceholderService {
  private readonly config = inject(AVATAR_PLACEHOLDER_CONFIG);

  getUniqueAvatarNamesPair() {
    const hostName = this.getRandomValueFromArray([
      ...AVATAR_NAMES,
    ]) as (typeof AVATAR_NAMES)[number];

    const strangerName = this.getRandomValueFromArray(
      AVATAR_NAMES.filter((name) => name !== hostName)
    ) as (typeof AVATAR_NAMES)[number];

    return [hostName, strangerName];
  }

  getRandomValueFromArray(array: unknown[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getAvatarSrc(name?: AvatarPlaceholderConfig['name']): string {
    const { api, style, format, radius, shapeColor } = this.config;
    const avatarName = name ?? this.getRandomValueFromArray([...AVATAR_NAMES]);
    return `${api}/${style}/${format}?seed=${avatarName}&radius=${radius}&shapeColor=${shapeColor}`;
  }
}
