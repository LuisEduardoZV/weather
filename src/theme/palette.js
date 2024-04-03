// theme vars
import mainTheme from '../assets/scss/_themes-vars.module.scss'

const colors = mainTheme

const defaultPalette = {
  colorPrimary: colors.primaryMain,
  colorPrimaryLight: colors.primaryLight,
  colorPrimaryDark: colors.primaryDark,
  colorSuccess: colors.successMain,
  colorSuccessLight: colors.successLight,
  colorSuccessDark: colors.successDark,
  colorWarning: colors.warningMain,
  colorWarningLight: colors.warningLight,
  colorWarningDark: colors.warningDark,
  colorError: colors.errorMain,
  colorErrorLight: colors.errorLight,
  colorErrorDark: colors.errorDark,
  colorLink: '',
  colorTextBase: '',
  colorBgBase: colors.background,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  borderRadius: 6
}

export { defaultPalette }

