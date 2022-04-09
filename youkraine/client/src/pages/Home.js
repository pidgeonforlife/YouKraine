import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'

const Home = () => {
    const [showModal, setShowModal] = useState(false)

    const authToken = false

    const handleClick = () => {
        console.log('Click!')
        setShowModal(true)
    }

    return (
        <div className='overlay'>
            <Nav minimal={false} setShowModal={setShowModal} showModal={showModal}/>
            <div className='home'>
                <h1>Find Humanitarian Aid</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Sign Out' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal}/>
                )}
            </div>
        </div>
    )
}

export default Home