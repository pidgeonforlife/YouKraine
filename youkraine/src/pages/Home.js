import Nav from '../components/Nav'

const Home = () => {

    const authToken = true

    const handleClick = () => {
        console.log('Click!')
    }

    return (
        <>
        <Nav/>
        <div className='home'>
            <h1>Find Humanitarian Aid</h1>
            <button className='primary-button'
            onClick={handleClick}>
                {authToken ? 'Sign Out' : 'Create Account'}
            </button>
        </div>
        </>
    )
}

export default Home