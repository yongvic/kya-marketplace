import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({locale}) => {
  // Provide a fallback for the locale when rendering statically.
  const nowLocale = locale ?? routing.defaultLocale;

  return {
    locale: nowLocale,
    messages: (await import(`../messages/${nowLocale}.json`)).default
  };
});