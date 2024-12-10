import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Bienvenue</h3>
                <p>Veuillez saisir vos identifiants pour vous connecter !</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
