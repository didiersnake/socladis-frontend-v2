import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token, user } = resp.data
                dispatch(onSignInSuccess(token))
                if (user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                name: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )

                    //come back and fix redirectUrl for employee login
                    // const redirectUrl = query.get(REDIRECT_URL_KEY)
                    navigate(
                         appConfig.authenticatedEntryPath
                    )
                    return {
                        status: 'success',
                        message: '',
                    }
                }else{
                    return {
                        status: 'failed',
                        message: resp.data[0].message,
                    }
                }

            }
        } catch (errors) {
            console.log(errors.toString())
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async () => {
        // await apiSignOut()
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
