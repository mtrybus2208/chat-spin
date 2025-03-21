import { InjectionToken } from '@angular/core';

export const AVATAR_NAMES = [
  'Alexander',
  'Leah',
  'Adrian',
  'Harry',
  'Sawyer',
  'Vivian',
  'Jocelyn',
  'Avery',
  'Caleb',
  'Nolan',
  'Christopher',
  'Sawyer',
  'Chase',
] as const;

export type AvatarPlaceholderConfig = {
  style: string;
  name: (typeof AVATAR_NAMES)[number];
  radius: number;
  format: string;
  api: string;
  shapeColor: string;
};

export const DEFAULT_AVATAR_PLACEHOLDER_CONFIG: AvatarPlaceholderConfig = {
  style: 'thumbs',
  name: 'Alexander',
  radius: 50,
  format: 'svg',
  api: 'https://api.dicebear.com/9.x',
  shapeColor: '0a5b83,1c799f,69d2e7,f1f4dc',
};

export const AVATAR_PLACEHOLDER_CONFIG =
  new InjectionToken<AvatarPlaceholderConfig>('AVATAR_PLACEHOLDER_CONFIG', {
    providedIn: 'root',
    factory: () => DEFAULT_AVATAR_PLACEHOLDER_CONFIG,
  });
