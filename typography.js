module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      'h1, h2, h3': {
        fontWeight: '700',
      },
      a: {
        color: theme('colors.primary.400'),
        '&:hover': {
          color: `${theme('colors.primary.500')}`,
        },
      },
      code: {
        color: theme('colors.primary.600'),
        background: theme('colors.neutral.200'),
        padding: '3px 4px',
        borderRadius: '4px',
      },
      p: {
        fontFamily: 'var(--font-wanted)',
      },
    },
  },
  invert: {
    css: {
      a: {
        color: theme('colors.primary.300'),
        '&:hover': {
          color: `${theme('colors.primary.400')}`,
        },
      },
      'h1,h2,h3,h4,h5,h6': {
        color: theme('colors.neutral.100'),
      },
    },
  },
});
