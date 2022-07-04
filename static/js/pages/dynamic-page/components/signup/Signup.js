import React from 'react'
import { Translate } from 'react-localize-redux'
import SignupForm from 'pages/signup/components/Signup/components/SignupForm'
import { ThemeContext } from '../../context'

const Signup = ({ language, dispatch }) => (
    <ThemeContext.Consumer>
        {(colorTheme) => (
            <div>
                <Translate>
                    {({ translate }) => (
                        <SignupForm
                            translate={translate}
                            simple={false}
                            language={language}
                            dispatch={dispatch}
                            virtualPathStep1="/trial/default.aspx?step=EnterUserInformation&flow=trial14"
                            emailVerificationSuccessUrl="signup-verify?rec=true&success=true"
                            emailVerificationFailedUrl="signup-verify?rec=true&success=false"
                            autoDownload={false}
                            playNow={false}
                            theme={colorTheme.signupFormTheme.theme}
                            //   onHasLoaded={() => this.setHasLoaded()}
                        />
                    )}
                </Translate>
            </div>
        )}
    </ThemeContext.Consumer>
)

export default Signup
