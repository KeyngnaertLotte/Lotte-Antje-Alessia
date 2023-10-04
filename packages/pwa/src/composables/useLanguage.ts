// const loadMessages = async ()
import { useI18n } from 'vue-i18n'

export default () => {
  const { locale, t } = useI18n()

  console.log(t('hello'))

  const loadMessages = async (locale: string) => {
    if (locale in SUPPORTED_LOCALES) {
        const messages = await import(`../locales/${locale}.json`).then(
            m => m.default[locale],
        )

        return messages
    }

    throw new Error(`unsupported locale: {locale}`);
  }

  const setLocale = async (locale:string) => {
    const messages = await loadMessages(locale)

    setLocaleMessage(targetLocale, messages)
    locale.value = targetLocale
  }

  return {
    locale,
    setLocale,
  }
}