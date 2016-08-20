import Typography from 'typography';

const typography = new Typography({
  title: 'LukeSheard',
  baseFontSize: '16px',
  baseLineHeight: '21px',
  modularScales: [
    {
      scale: 'octave',
    },
  ],
  googleFonts: [
    {
      name: 'Karla',
      styles: [
        400,
      ],
    },
    {
      name: 'Lato',
      styles: [
        300,
        400,
      ],
    },
  ],

  // HEADER STYLES
  headerFontFamily: [
    'Karla',
    'Lato',
    '-apple-system',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
  headerGray: 15,
  headerWeight: 400,

  // BODY STYLES
  bodyFontFamily: [
    'Lato',
    '-apple-system',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
  bodyGray: 30,
  bodyWeight: 300,

  // GENERAL SETTINGS
  boldWeight: 400,
  blockMarginBottom: 0.65,
});

export default typography;
