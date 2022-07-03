import React, { Component } from 'react'
import { isClient } from 'config/web'
import Link from 'features/link'
import { SelectLanguage } from 'features'
import AccountMenu from 'features/account-management-menu'
import { SvgIcon } from 'layouts'
import LanguageType from 'models/language-type'
import NavItems from './components/navitems'
import MobileMenu from './components/mobile-menu'
import CTA from './components/cta'
import Notification from './components/sale'
import style from './Navigation.module.scss'

interface Props {
    showNavigation: boolean
    mobileOpen: boolean
    lightTheme: boolean
    hideBorder: boolean
    closeMobileNavigation: () => void
    toggleMobileNavigation: () => void
    hideCTA: boolean
    language: LanguageType
    page: string
    currentPage: string
}

interface State {
    timeoutId: NodeJS.Timeout
    render: boolean
    scenario: string
}

class Navigation extends Component<Props, State> {
    start: number

    height: string

    minHeight: string

    scroll: number

    widthMediaQuery: MediaQueryList

    heightMediaQuery: MediaQueryList

    constructor(props: Props) {
        super(props)

        const timeoutId = setTimeout(() => {
            this.setState({ render: true })
        }, 300)

        this.state = {
            timeoutId,
            render: false,
            scenario: 'TopShow',
        }

        this.start = new Date().valueOf()
        this.height = '100vh'
        this.minHeight = '100vh'
        this.scroll = 0

        if (isClient) {
            // First we add a listener to listen for window width changes
            // This is to make sure we only show the opened mobile menu when the
            // size of the browser should show the mobile menu
            this.widthMediaQuery = window.matchMedia('(max-width: 1280px)')
            this.widthMediaQuery.addListener((listener) =>
                this.handleWidthChange(listener)
            )
            this.handleWidthChange(this.widthMediaQuery)

            // Then we add another listener for height changes
            // This is to make sure the menu is never smaller than 650px
            this.heightMediaQuery = window.matchMedia('(max-height: 650px)')
            this.heightMediaQuery.addListener((listener) =>
                this.handleHeightChange(listener)
            )
            this.handleHeightChange(this.heightMediaQuery)
        }
    }

    componentDidMount(): void {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.mobileOpen !== this.props.mobileOpen) {
            if (this.props.mobileOpen) {
                this.setOverflow()
            } else {
                this.removeOverflow()
            }
        }
    }

    componentWillUnmount(): void {
        this.widthMediaQuery.removeListener(this.handleWidthChange)
        this.heightMediaQuery.removeListener(this.handleHeightChange)
        this.removeOverflow()
        clearTimeout(this.state.timeoutId)
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleWidthChange = (
        listener: MediaQueryListEvent | MediaQueryList
    ): void => {
        if (!listener.matches) {
            this.removeOverflow(this.props.mobileOpen)
        } else if (this.props.mobileOpen) {
            this.setOverflow()
        }
    }

    getClassName = (): string => {
        const { scenario } = this.state
        const { mobileOpen: open, lightTheme: light } = this.props

        return style('navigation', {
            hide: scenario === 'ScrollTimer' || scenario === 'TopHide',
            scrolled: scenario === 'ScrollShow',
            show: scenario === 'TopShow' || scenario === 'ScrollShow',
            open,
            closed: !open,
            light,
        })
    }

    toggleOpen = (): void => {
        this.props.toggleMobileNavigation()
    }

    closeMenu = (): void => {
        this.props.closeMobileNavigation()
    }

    getColorFromTheme = (): string => {
        let color = '#fff'

        if (
            this.props.lightTheme &&
            this.state.scenario === 'TopShow' &&
            !this.props.mobileOpen
        ) {
            // logoSrc = logoDark
            color = '#000'
        }
        return color
    }

    handleHeightChange = (
        listener: MediaQueryListEvent | MediaQueryList
    ): void => {
        this.height = listener.matches ? '650px' : '100vh'
        this.minHeight = listener.matches ? '600px' : '100vh'

        // If we are in mobile view and the menu is showing
        // Then we update the height and minHeight on body
        if (this.widthMediaQuery.matches && this.props.mobileOpen) {
            const html = document.getElementsByTagName('html')[0]
            const body = html.getElementsByTagName('body')[0]
            body.style.height = this.height
            body.style.minHeight = this.minHeight
        }
    }

    handleScroll = (): void => {
        if (!this.props.showNavigation) return

        if (this.props.mobileOpen && this.widthMediaQuery.matches) return

        // If window believes the scroll is 0, check what we have stored, since
        // it might be a case of opening/closing the menu
        const scroll = window.scrollY === 0 ? this.scroll : window.scrollY
        if (this.state.render) {
            if (
                this.state.scenario !== 'ScrollTimer' &&
                this.state.scenario !== 'ScrollShow' &&
                this.state.scenario !== 'TopHide' &&
                scroll >= 10
            ) {
                this.setState({ scenario: 'TopHide' })
            } else if (this.state.scenario !== 'TopShow' && scroll < 10) {
                clearTimeout(this.state.timeoutId)
                this.setState({ scenario: 'TopShow' })
            } else if (
                this.state.scenario !== 'ScrollTimer' &&
                this.state.scenario !== 'ScrollShow' &&
                scroll >= 10
            ) {
                const timeoutId = setTimeout(() => {
                    this.setState({ scenario: 'ScrollShow' })
                }, 500)
                this.setState({ scenario: 'ScrollTimer', timeoutId })
            }
        } else if (scroll < 10 && this.state.scenario !== 'TopShow') {
            this.setState({ scenario: 'TopShow' })
        } else if (scroll >= 10 && this.state.scenario !== 'ScrollShow') {
            this.setState({ scenario: 'ScrollShow' })
        }
    }

    removeOverflow = (resetScroll = true): void => {
        const html = document.getElementsByTagName('html')[0]
        const body = html.getElementsByTagName('body')[0]
        const main = body.getElementsByTagName('main')[0]
        // html.classList.remove('no-scroll')
        body.style.height = null
        body.style.minHeight = null
        if (main) {
            main.style.top = null
        }
        if (resetScroll) {
            window.scrollTo(0, this.scroll)
            this.scroll = 0
        }
    }

    setOverflow = (): void => {
        this.scroll = window.scrollY
        const html = document.getElementsByTagName('html')[0]
        const body = html.getElementsByTagName('body')[0]
        const main = body.getElementsByTagName('main')[0]
        if (this.scroll > 0) {
            const top = this.scroll * -1
            main.style.top = `${top}px`
        }
        // html.classList.add('no-scroll')
        body.style.height = this.height
        body.style.minHeight = this.minHeight
        window.scrollTo(0, 0)
    }

    renderLogo = (): JSX.Element => {
        // let logoSrc = '//web.ccpgamescdn.com/aws/eveonline/images/eve_logo.png'
        // let logoColor = '#fff'

        // if (
        //     this.props.lightTheme &&
        //     this.state.scenario === 'TopShow' &&
        //     !this.props.mobileOpen
        // ) {
        //     // logoSrc = logoDark
        //     logoColor = '#000'
        // }

        const logoColor = this.getColorFromTheme()

        return (
            <div
                role="navigation"
                key="titleContent"
                id="logo"
                className={style.titleContent}
                onClick={() => {
                    this.closeMenu()
                }}
            >
                <Link className={style.logo} title="Home">
                    <SvgIcon
                        width={130}
                        name="eve-logo-with-text"
                        fill={logoColor}
                    />
                </Link>
            </div>
        )
    }

    renderMenuTitleFiller = (): JSX.Element => (
        <div key="titleFiller" className={style.titleFiller} />
    )

    renderMenuTitle = (): Array<JSX.Element> => [
        this.renderMenuTitleFiller(),
        this.renderLogo(),
    ]

    renderMenuButton = (): JSX.Element => (
        <div
            className={style('menuButton', {
                light: !this.props.mobileOpen && this.props.lightTheme,
            })}
        >
            <div
                role="navigation"
                className={style('button', { closed: !this.props.mobileOpen })}
                onClick={() => {
                    this.toggleOpen()
                }}
            >
                <span />
                <span />
                <span />
            </div>
        </div>
    )

    renderLogin = (): JSX.Element => {
        const { currentPage } = this.props

        // NEW LOGIN
        const login = (
            <div className={style.login2}>
                <AccountMenu currentPage={currentPage} />
            </div>
        )

        return login
    }

    render(): JSX.Element {
        if (!this.props.showNavigation || !this.state.render) {
            return null
        }

        const className = this.getClassName()

        return (
            <div className={className}>
                <nav id="navio" className={style.container}>
                    {this.renderMenuButton()}
                    <div
                        className={style(
                            style.inner,
                            this.props.hideBorder ? '' : style.border
                        )}
                    >
                        {this.renderMenuTitle()}
                        <NavItems className={style.desktopView} />
                        <CTA
                            className={style(style.signup, {
                                [style.hide]: this.props.hideCTA,
                            })}
                        />
                        <div className={style.navRight}>
                            <Notification language={this.props.language} />
                            {this.renderLogin()}
                            <SelectLanguage className={style.language} />
                        </div>
                    </div>
                </nav>
                <MobileMenu
                    open={this.props.mobileOpen}
                    closeMenu={this.closeMenu}
                    currentPage={this.props.page}
                />
            </div>
        )
    }
}

export default Navigation
