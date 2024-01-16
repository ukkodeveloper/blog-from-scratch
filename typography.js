module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      h2: {
        fontSize: '2rem',
        paddingBottom: '8px',
        borderBottom: `1px ${theme('colors.neutral.200')} solid`,
      },
      h3: {
        fontSize: '1.5rem',
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
      'p, li': {
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
