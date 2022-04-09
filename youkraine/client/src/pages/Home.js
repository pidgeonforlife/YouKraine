import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false

    const handleClick = () => {
        console.log('Click!')
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className='overlay'>
            <Nav minimal={false} setShowModal={setShowModal} showModal={showModal}/>
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