import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Translate } from 'react-localize-redux'
import { redirect } from 'redux-first-router'
import { GlobalState } from 'types/redux'
import { Icon } from 'layouts'
import style from './Search.module.scss'

interface Props {
    onSearch?: () => void
}

const Search: React.FunctionComponent<Props> = ({ onSearch }) => {
    const dispatch = useDispatch()
    const language = useSelector((state: GlobalState) => state.language)

    const [inputString, setInputString] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        setInputString(event.target.value)
    }

    const performSearch = (event: FormEvent): void => {
        const lang = language === 'en' ? null : language

        const payload = {
            lang,
            page: 'news',
            subpage: 'search',
            query: {
                q: inputString,
            },
        }

        dispatch(
            redirect({
                type: 'PAGE',
                payload,
                // query: { q: inputString }
            })
        )

        // Check for callback function props
        // Used to detect search enter in mobile "MobileMenu.js"
        if (onSearch) {
            onSearch()
        }

        event.preventDefault()
    }

    return (
        <Translate>
            {({ translate }) => (
                <div className={style.search}>
                    <form onSubmit={performSearch}>
                        <input
                            type="text"
                            placeholder={`${translate('news.searchNews')}`}
                            value={inputString}
                            onChange={(event) => handleInputChange(event)}
                        />
                        <button type="button" onClick={performSearch}>
                            <Icon solid name="search" />
                        </button>
                    </form>
                </div>
            )}
        </Translate>
    )
}

export default Search

