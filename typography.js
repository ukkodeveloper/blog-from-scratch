module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      h2: {
        fontSize: '1.8rem',
        paddingBottom: '8px',
        color: `${theme('colors.neutral.700')}`,
        borderBottom: `1px ${theme('colors.neutral.300')} solid`,
      },
      h3: {
        color: `${theme('colors.neutral.700')}`,
        fontSize: '1.3rem',
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
        fontSize: '1.1rem',
      },
      li: {
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      },
      img: {
        margin: '22px auto',
        borderRadius: '16px',
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
