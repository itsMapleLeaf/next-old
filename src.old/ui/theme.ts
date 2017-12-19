import * as Color from 'color'

export const theme = {
  mainColor: Color.hsl(210, 60, 28),
  textColor: Color.hsl(192, 15, 93),
  textShadow: '0px 1px 2px rgba(black, 0.4)',
}

export type Theme = typeof theme

/**
 * A utility function meant to reduce the boilerplate of using a theme value in styles.
 *
 * @param key The key of the theme value
 * @param transformer An optional transformer function to edit the value before returning it
 *
 * @example
 * ```ts
 * const someStyles = css`
 *   color: ${withThemeValue('mainColor')}
 *   background-color: ${withThemeValue('mainColor', color => darken(color, 0.5))};
 * `
 * ```
 */
export function withThemeValue<K extends keyof Theme>(
  key: K,
  transformer?: (themeValue: Theme[K]) => any,
) {
  return function themeValueAction({ theme }: { theme?: Theme }) {
    if (!theme) {
      throw new Error(
        "Couldn't find the theme, is it injected with <ThemeProvider /> from styled-components?",
      )
    }

    if (transformer) {
      return String(transformer(theme[key]))
    }

    return String(theme[key])
  }
}
