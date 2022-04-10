import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'

const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: false,
        gender_identity: 'man',
        gender_interest: 'woman',
        url: '',
        about: '',
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', { formData })
            const success = response.status === 200
            console.log(response)
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    console.log(formData)

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className='onBoarding'>
                <h2>CREATE ACCOUNT</h2>
                
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor='first_name'>First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder='First Name'
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <input
                            id="dob_day"
                            type="number"
                            name="dob_day"
                            placeholder='DD'
                            required={true}
                            value={formData.dob_day}
                            onChange={handleChange}
                        />
                        <input
                            id="dob_month"
                            type="number"
                            name="dob_month"
                            placeholder='MM'
                            required={true}
                            value={formData.dob_month}
                            onChange={handleChange}
                        />
                        <input
                            id="dob_year"
                            type="number"
                            name="dob_year"
                            placeholder='YYYY'
                            required={true}
                            value={formData.dob_year}
                            onChange={handleChange}
                        />

                        <label>Status</label>
                        <label htmlFor='woman-gender-identity'>Refugee</label>
                        <input
                            id="woman-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_identity === 'man'}
                        />
                        <label htmlFor='man-gender-identity'>Supporter</label>
                        <input
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_identity === 'woman'}
                        />

                        <label>Show Me</label>
                        <label htmlFor='woman-gender-interest'>Refugee</label>
                        <input
                            id="woman-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_interest === 'man'}
                        />
                        <label htmlFor='man-gender-interest'>Supporter</label>
                        <input
                            id="man-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_interest === 'woman'}
                        />
                        <input type="submit"/>

                        <label htmlFor='about'>About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            onChange={handleChange}
                            placeholder="I like long walks along the beach!"
                            value={formData.about}
                        />
                    </section>
                    <label htmlFor='man-gender-interest'>Supporter</label>
                        <input
                            type="url"
                            name='url'
                            id='url'
                            onChange={handleChange}
                            required={true}
                        />
                        <div className='photo-container'>
                            {formData.url && <img src={formData.url} alt='profile pic preview' />}
                        </div>
                    <section>

                    </section>
                </form>
            </div>
        </>
    )
}
export default Onboarding