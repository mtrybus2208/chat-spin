const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    // './apps/**/*.{html,ts}',
    // './libs/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      {
        halloween: {
          ...require('daisyui/src/theming/themes')['halloween'],
          'base-100': '#262525',
          'base-200': '#212121',
          'base-300': '#242424',
          neutral: '#2c2b2b',
          // accent: '#1B1B1B',
          // '.tooltip-primary	': {
          //   'background-color': 'red',
          // },
        },
      },
    ],
  },
};
