import React from 'react'
import Logger from 'utils/logging'

const TestErrorPage = () => {
    // console.log('Console.log from Test Page')

    Logger.addBreadcrumb('This is a breadcrumb message from test page.')
    let pi
    // let fixed

    // let hasError = false

    // try {
    //     pi = 3.14159
    // throw new Error('Throwing test error')
    console.log('going to crash big time!')

    const fixed = pi.toFixed(100000)
    // console.log('fixed is :', fixed)
    // } catch (error) {
    //     Logger.captureException(error, {
    //         category: 'test',
    //         message: 'In TestPage',
    //     })
    //     hasError = true
    // }

    return (
        <div>
            {/* {hasError ? <h1>An exception occurred</h1> : <h1>All is good</h1>} */}
            {/* <h1>An exception </h1> */}
            <h1>{pi}</h1>
            <h1>{fixed}</h1>
        </div>
    )
}

export default TestErrorPage

