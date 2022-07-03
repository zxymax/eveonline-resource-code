import React from 'react'
import PropTypes from 'prop-types'
import { flags } from 'config'
import Link from 'features/link'
import { SvgIcon } from 'layouts'
import { setLangCookie } from 'utils/langCookie'
import style from './SelectLanguage.scss'

const SelectLanguage = ({
    languages,
    language,
    page,
    subpage,
    id,
    subid,
    query,
    className,
}) => {
    // Languages text
    const list = {
        en: 'English',
        fr: 'Français',
        de: 'Deutsch',
        ru: 'РУССКИЙ',
        ja: '日本語',
    }

    const { colorThemeEnabled } = flags.features

    // Map languages
    const langs = languages.map((lang) => (
        <li key={lang} className={style({ [style.active]: lang === language })}>
            <Link
                path={{ page, subpage, id, subid, query }}
                lang={lang}
                hrefLang={lang}
                onClick={() => setLangCookie(lang)}
            >
                <span className={style.lang_text}>{list[lang] || lang}</span>
                <span className={style.lang_code}>{lang}</span>
            </Link>
        </li>
    ))

    return (
        <div
            className={style(
                style.language,
                { [style.colorTheme]: colorThemeEnabled },
                className
            )}
            data-locale={language}
        >
            <SvgIcon name="globe" className={style.globe} width={20} />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="none"
              viewBox="0 0 21 21"
            >
                <path
                  fill="#5CA2D5"
                  d="M10.5 20.672C4.7 20.672 0 16.119 0 10.5 0 4.88 4.7.328 10.5.328S21 4.881 21 10.5c0 5.62-4.7 10.172-10.5 10.172zm8.18-6.235h-3.493c-.381 1.822-1.02 3.372-1.83 4.475 2.33-.746 4.243-2.374 5.323-4.474zM14.226 10.5c0-.94-.068-1.813-.182-2.625H6.956a18.79 18.79 0 0 0-.182 2.625c0 .94.068 1.813.182 2.625h7.088c.114-.812.182-1.686.182-2.625zM10.5 19.36c1.139 0 2.6-1.81 3.307-4.922H7.193c.707 3.113 2.168 4.921 3.307 4.921zm-2.858-.448c-.804-1.099-1.448-2.65-1.829-4.474H2.32c1.08 2.1 2.994 3.728 5.322 4.474zM1.355 10.5c0 .915.144 1.796.41 2.625h3.832a19.444 19.444 0 0 1 0-5.25H1.766a8.55 8.55 0 0 0-.411 2.625zm.965-3.938h3.493c.381-1.82 1.02-3.371 1.83-4.474-2.33.746-4.243 2.375-5.323 4.474zm8.18-4.921c-1.139 0-2.6 1.808-3.307 4.921h6.614C13.1 3.45 11.639 1.641 10.5 1.641zm2.858.447c.804 1.099 1.448 2.65 1.829 4.474h3.493c-1.08-2.1-2.993-3.728-5.322-4.474zm2.045 5.787a19.447 19.447 0 0 1 0 5.25h3.832c.266-.829.41-1.71.41-2.625s-.144-1.796-.41-2.625h-3.832z"
                />
            </svg> */}
            <div className={style.selected}>
                <span>{language}</span>
            </div>
            <ul>{langs}</ul>
        </div>
    )
}

SelectLanguage.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    page: PropTypes.string,
    subpage: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subid: PropTypes.string,
    query: PropTypes.shape({
        query: PropTypes.string,
    }),
    className: PropTypes.string,
}

export default SelectLanguage

