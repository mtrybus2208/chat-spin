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
  } as unknown as PaletteDesignToken satisfies PaletteDesignToken),
  // Globalny kolor tekstu dla komponentów PrimeNG (buttons, inputs, floatlabel, datepicker itd.)
  {
    semantic: {
      colorScheme: {
        light: {
          text: {
            color: '#362827',
            hoverColor: '#362827',
            mutedColor: '#362827',
            hoverMutedColor: '#362827',
          },
          primary: {
            // np. <p-button> primary używa {primary.contrast.color}
            contrastColor: '#362827',
          },
          formField: {
            // inputy, placeholdery, labelki (FloatLabel), ikony w polach
            color: '#362827',
            placeholderColor: '#362827',
            floatLabelColor: '#362827',
            floatLabelFocusColor: '#362827',
            floatLabelActiveColor: '#362827',
            iconColor: '#362827',
          },
          content: {
            // teksty w panelach/overlay (np. datepicker popup)
            color: '#362827',
            hoverColor: '#362827',
          },
          highlight: {
            // tekst w range/selected itp.
            color: '#362827',
            focusColor: '#362827',
          },
        },
      },
    },
    components: {
      button: {
        root: {
          borderRadius: 'var(--ds-radius-button)',
          paddingY: 'var(--ds-space-3)',
        },
        css: `
          .p-button {
              border: 2px solid var(--ds-color-meals-neutral-50);
              border-bottom-width: 4px;
          }
          .p-button:not(:disabled):hover,
          .p-button:not(:disabled):active {
              border: 2px solid var(--ds-color-meals-neutral-50);
              border-bottom-width: 4px;
          }
        `,
      },
      datepicker: {
        panel: {
          borderRadius: 'var(--ds-radius-2xl)',
          padding: 'var(--ds-space-3)',
        },
      },
      inputtext: {
        root: {
          paddingX: 'var(--ds-space-3)',
          paddingY: 'var(--ds-space-3-5)',
          borderRadius: 'var(--ds-radius-2xl)',
        },
      },
      message: {
        text: {
          fontWeight: '400',
        },
      },
    },
  }
);
