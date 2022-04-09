import Nav from '../components/Nav'

const Home = () => {

    const authToken = false

    const handleClick = () => {
        console.log('Click!')
    }

    return (
        <div className='overlay'>
            <Nav minimal={false} authToken={authToken}/>
            <div className='home'>
                <h1>Find Humanitarian Aid</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Sign Out' : 'Create Account'}
                </button>
            </div>
        </div>
    )
}

export default Home