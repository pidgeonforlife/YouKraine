import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    const handleClick = () => {

        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        console.log('Click!')
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className='overlay'>
            <Nav
            authToken={authToken} 
            minimal={false} 
            setShowModal={setShowModal} 
            showModal={showModal}
            setIsSignUp={setIsSignUp}/>
            <div className='home'>
                <h1>SUPPORT WITH A SWIPE</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Sign Out' : 'Create Account'}
                </button>
                <a>Already a member? Login</a>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}

export default Home