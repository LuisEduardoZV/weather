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
  fontFamily: "'Dosis', sans-serif",
  fontWeight: 400,
  fontSize: 15,
  borderRadius: 4
}

export { defaultPalette }

