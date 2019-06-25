const spacingUnit = 5;
const spacing = {
    quaterGap: `${spacingUnit}px`,
    halfGap: `${spacingUnit * 2}px`,
    gap: `${spacingUnit * 4}px`,
}

const systemFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
const fonts = {
    header: 'Muli, ${systemFont}',
    content: systemFont
}

const fontSizes = {
    content: '20px',
    tag: '16px',
}

const colors = {
    colorWhite: '#fff',
    colorLightBlue: '#61DAFB',
    colorLightBrown: '#AB5321',
}

const colorAliases = {
    tech: {
        react: colors.colorLightBlue,
        CSS: colors.colorLightBrown,
    }
}

export default {
    fonts: {
        ...fonts,
        size: {...fontSizes}
    },
    ...spacing,
    // Font Size
    fontSizeContent: '20px',

    ...colors,
    colorAlias: {
        ...colorAliases,
    }
}