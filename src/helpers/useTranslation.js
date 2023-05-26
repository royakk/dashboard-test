import { locales } from './i18n';
import { useRouter } from 'next/router';

export const useTranslation = () => {
    const { locale } = useRouter();
    const t = (value) => locales[locale][value] || value;
    return { t };
};
