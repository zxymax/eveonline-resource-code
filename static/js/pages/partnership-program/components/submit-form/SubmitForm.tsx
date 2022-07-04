import React from 'react'
import { useSelector } from 'react-redux'
import { Translate, TranslateFunction } from 'react-localize-redux'
import SectionType from 'models/types/ts/sectionType'
import { getQuery, getLocation } from 'lib/location/selectors'
import { Link } from 'features'
import { isClient } from 'config/web'
import AnimatedText from 'layouts/animated-text'
import { Section, Container, Frame, Icon } from 'layouts'
import BackgroundImage from 'features/background-image'
import {
    HeadingRegular,
    HeadingMedium,
    ParagraphLarge,
} from 'layouts/typography'
import style from './SubmitForm.module.scss'

interface Props {
    section: SectionType
}

const SubmitForm = ({ section }: Props): JSX.Element => {
    const { headline, teaser } = section
    const query = useSelector((state) => getQuery(state))
    const location = useSelector((state) => getLocation(state))

    function renderEmailSignup(translate: TranslateFunction): JSX.Element {
        if (isClient) {
            const uniqueApplicationKey = Date.now()

            const theFormHtml =
                `<form action="https://cl.exct.net/DEManager.aspx" name="subscribeForm" method="post"> ` +
                ` <input type="hidden" name="applicationID" value="${uniqueApplicationKey}" /> ` +
                ` <input type="hidden" name="_clientID" value="7230148" /> ` +
                ` <input type="hidden" name="_deExternalKey" value="4C9733B5-588C-42D5-B282-740548A6097D" /> ` +
                ` <input type="hidden" name="_action" value="add" /> ` +
                ` <input type="hidden" name="_returnXML" value="0" /> ` +
                ` <input type="hidden" name="_successURL" value="${window.location.origin}${location.pathname}?success=true" /> ` +
                ` <input type="hidden" name="_errorURL" value="${window.location.origin}${location.pathname}?success=false" /> ` +
                ` <label for="email">${translate(
                    'partnershipProgram.formLabelEmail'
                )}*</label><input id="email" name="Email" type="email" required maxlength="100"></div>` +
                ` <label for="name">${translate(
                    'partnershipProgram.formLabelName'
                )}*</label> <input type="text" id="name" name="Name" required maxlength="100"><br />` +
                ` <label for="character">${translate(
                    'partnershipProgram.formLabelCharacter'
                )}*</label> <input type="text" id="character" name="EVECharacter" required maxlength="100"><br />` +
                ` <label for="account">${translate(
                    'partnershipProgram.formLabelAccount'
                )}*</label> <input type="text" id="account" name="EVEAccount" required maxlength="100"><br />` +
                ` <label for="description">${translate(
                    'partnershipProgram.formLabelDescription'
                )}*</label> <textarea rows="6" cols="50" id="description" name="Description" required></textarea><br />` +
                ` <label for="content">${translate(
                    'partnershipProgram.formLabelContent'
                )}*</label><input type="text" name="Content" id="content" required maxlength="100"><br />` +
                ` <label for="howOftenUpdate">${translate(
                    'partnershipProgram.formLabelHowOften'
                )}*</label><input type="text" name="HowOftenUpdate" id="howOftenUpdate" required maxlength="100"><br />` +
                ` <label for="social">${translate(
                    'partnershipProgram.formLabelSocial'
                )}</label><input type="text" name="SocialMedia" id="social" maxlength="100"><br />` +
                ` <label for="metrics">${translate(
                    'partnershipProgram.formLabelMetrics'
                )}</label> <input type="text" name="Metrics" id="metrics" maxlength="100"><br />` +
                ` <label for="anythingElse">${translate(
                    'partnershipProgram.formLabelAnythingElse'
                )}</label> <input type="text" name="AnythingElse" id="anythingElse" maxlength="100"><br />` +
                ` <em><input type="checkbox" required name="terms">${translate(
                    'partnershipProgram.formTerms'
                )}</em>` +
                ` <input type="submit" value="${translate(
                    'partnershipProgram.buttonText'
                )}"></input>` +
                ` </form>`

            const goBack =
                '<input action="action" onclick="window.history.go(-1); return false;" type="submit" value="Try again" />'

            if (query?.success === 'true') {
                return (
                    <BackgroundImage
                        url="https://images.ctfassets.net/7lhcm73ukv5p/7Gf5SJsblO3N4MvvoTpK7X/016c5556d0cb889ceb5ac327389b6b00/partnership_program_bg.jpg"
                        repeat="no-repeat"
                        size="cover"
                        height={800}
                        position="top center"
                        className={style.heroBG}
                    >
                        <div className={style.heroContainer}>
                            <Container className={style.hero}>
                                <div className={style.text}>
                                    <HeadingMedium>
                                        <AnimatedText>{headline}</AnimatedText>
                                    </HeadingMedium>
                                    <HeadingRegular>
                                        <AnimatedText>{teaser}</AnimatedText>
                                    </HeadingRegular>
                                </div>
                            </Container>
                        </div>
                        <Section className={style.submitForm}>
                            <Frame className={style.frameContainer}>
                                <div className={style.formContainer}>
                                    <div className={style.success}>
                                        <Icon
                                            regular
                                            name="check-circle"
                                            className={style.success}
                                        />
                                        <ParagraphLarge>
                                            <Translate id="partnershipProgram.successText">
                                                Thank you for applying to the
                                                Partnership Program! Your
                                                application may take some time
                                                to process. An email will be
                                                sent to you with the results of
                                                your application once available.
                                            </Translate>
                                        </ParagraphLarge>
                                    </div>
                                </div>
                            </Frame>
                        </Section>
                    </BackgroundImage>
                )
            }
            if (query?.success === 'false') {
                return (
                    <BackgroundImage
                        url="https://images.ctfassets.net/7lhcm73ukv5p/7Gf5SJsblO3N4MvvoTpK7X/016c5556d0cb889ceb5ac327389b6b00/partnership_program_bg.jpg"
                        repeat="no-repeat"
                        size="cover"
                        height={800}
                        position="top center"
                        className={style.heroBG}
                    >
                        <div className={style.heroContainer}>
                            <Container className={style.hero}>
                                <div className={style.text}>
                                    <HeadingMedium>
                                        <AnimatedText>{headline}</AnimatedText>
                                    </HeadingMedium>
                                    <HeadingRegular>
                                        <AnimatedText>{teaser}</AnimatedText>
                                    </HeadingRegular>
                                </div>
                            </Container>
                        </div>
                        <Section className={style.submitForm}>
                            <Frame className={style.frameContainer}>
                                <div className={style.formContainer}>
                                    <div className={style.fail}>
                                        <Icon
                                            light
                                            name="times"
                                            className={style.failed}
                                        />
                                        <ParagraphLarge>
                                            Error occured when submitting your
                                            application. <br />
                                            Please make sure you have entered
                                            all the required information. Please
                                            contact{' '}
                                            <a href="https://support.eveonline.com/hc/en-us">
                                                customer support
                                            </a>{' '}
                                            if problem persists.
                                        </ParagraphLarge>

                                        <div
                                            className={style.backButton}
                                            //    eslint-disable-next-line
                                            dangerouslySetInnerHTML={{
                                                __html: goBack,
                                            }}
                                        />
                                    </div>
                                </div>
                            </Frame>
                        </Section>
                    </BackgroundImage>
                )
            }
            return (
                <>
                    <BackgroundImage
                        url="https://images.ctfassets.net/7lhcm73ukv5p/7Gf5SJsblO3N4MvvoTpK7X/016c5556d0cb889ceb5ac327389b6b00/partnership_program_bg.jpg"
                        repeat="no-repeat"
                        size="contain"
                        height={800}
                        position="top center"
                        className={style.heroBG}
                    >
                        <div className={style.heroContainer}>
                            <Container className={style.hero}>
                                <div className={style.text}>
                                    <HeadingMedium>
                                        <AnimatedText>{headline}</AnimatedText>
                                    </HeadingMedium>
                                    <HeadingRegular>
                                        <AnimatedText>{teaser}</AnimatedText>
                                    </HeadingRegular>
                                </div>
                            </Container>
                        </div>

                        <Section className={style.submitForm}>
                            <Frame className={style.frameContainer}>
                                <div className={style.formContainer}>
                                    <ParagraphLarge>
                                        <Translate id="partnershipProgram.formTitle">
                                            Please use the following form to
                                            apply for the EVE Online Partnership
                                            Program. At this time we require all
                                            applications to be completed in
                                            English.
                                        </Translate>
                                    </ParagraphLarge>
                                    <div
                                        //    eslint-disable-next-line
                                        dangerouslySetInnerHTML={{
                                            __html: theFormHtml,
                                        }}
                                    />
                                    <div className={style.back}>
                                        <Link path={{ page: 'partners' }}>
                                            <Icon name="long-arrow-left" />
                                            <Translate id="partnershipProgram.backButtonText">
                                                Back to Partnership program
                                            </Translate>
                                        </Link>
                                    </div>
                                    <p className={style.disclaimer}>
                                        <Translate id="partnershipProgram.formTextBelow">
                                            After being submitted it may take
                                            some time for your application to be
                                            processed. An email will be sent
                                            with the results of your application
                                            when available. Please be aware that
                                            applications must pass CCP review
                                            and that meeting minimum
                                            requirements is not a guarantee of
                                            acceptance.
                                        </Translate>
                                    </p>
                                </div>
                            </Frame>
                        </Section>
                    </BackgroundImage>
                </>
            )
        }
    }

    return (
        <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
            <Translate>
                {({ translate }) => isClient && renderEmailSignup(translate)}
            </Translate>
        </BackgroundImage>
    )
}

export default SubmitForm

