import icon from '../images/icon.png'
import logo from '../images/logo.png'

const Nav = ({ minimal, authToken }) => {

  return (
    <nav>
      <div className='logo-container'>
        <img className='logo'
          src={minimal ? icon : logo}
          alt='logo' />
      </div>

      {!authToken && <button className='nav-button'>Log in</button>}
    </nav>
  )
}

export default Nav