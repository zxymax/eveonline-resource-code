import * as Yup from 'yup'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

function signupValidation(translate) {
    return Yup.object().shape({
        email: Yup.string()
            .email(`${translate('signup.validation.emailInvalid')}`)
            .required(`${translate('signup.validation.emailNotEmpty')}`),
        username: Yup.string()
            .required(`${translate('signup.validation.usernameNotEmpty')}`)
            .min(4, `${translate('signup.validation.usernameLonger')}`)
            .matches(
                /^[A-Za-z0-9][A-Za-z0-9_.-]*[A-Za-z0-9]$/,
                `${translate('signup.validation.usernameInvalid')}`
            ),
        password: Yup.string()
            .required(`${translate('signup.validation.passwordNotEmpty')}`)
            .min(8, `${translate('signup.validation.passwordLonger')}`),
        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        agreedTerms: Yup.boolean().oneOf(
            [true],
            translate('signup.validation.acceptTerms')
        ),
    })
}

export default signupValidation
