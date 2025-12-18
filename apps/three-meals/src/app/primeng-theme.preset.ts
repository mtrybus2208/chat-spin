import {
  definePreset,
  palette,
  updatePrimaryPalette,
  updateSurfacePalette,
} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import type { PaletteDesignToken } from '@primeuix/themes/types';

const threeMealsSurfaceLight = {
  0: '#ffffff',
  50: '#FDF4C2',
  100: '#FAEB95',
  200: '{slate.200}',
  300: '{slate.300}',
  400: '{slate.400}',
  500: '{slate.500}',
  600: '{slate.600}',
  700: '{slate.700}',
  800: '{slate.800}',
  900: '{slate.900}',
  950: '{slate.950}',
} as const;

const auraSurfaceDark = {
  0: '#ffffff',
  50: '{zinc.50}',
  100: '{zinc.100}',
  200: '{zinc.200}',
  300: '{zinc.300}',
  400: '{zinc.400}',
  500: '{zinc.500}',
  600: '{zinc.600}',
  700: '{zinc.700}',
  800: '{zinc.800}',
  900: '{zinc.900}',
  950: '{zinc.950}',
} as const;

export const THREE_MEALS_PRIMENG_PRESET = definePreset(
  Aura,
  updatePrimaryPalette(
    palette(
      '#F5C725'
    ) as unknown as PaletteDesignToken satisfies PaletteDesignToken
  ),
  updateSurfacePalette({
    light: threeMealsSurfaceLight,
    dark: auraSurfaceDark,
  } as unknown as PaletteDesignToken satisfies PaletteDesignToken)
);
