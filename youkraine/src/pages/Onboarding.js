import { useState } from 'react'
import Nav from '../components/Nav'

const Onboarding = () => {


    const handleSubmit = () => {
        console.log("submitted")
    }

    const handleChange = () => {
        console.log("changed")
    }

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
                            value={""}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <input
                            id="dob_day"
                            type="number"
                            name="dob_day"
                            placeholder='DD'
                            required={true}
                            value={""}
                            onChange={handleChange}
                        />
                        <input
                            id="dob_month"
                            type="number"
                            name="dob_month"
                            placeholder='MM'
                            required={true}
                            value={""}
                            onChange={handleChange}
                        />
                        <input
                            id="dob_year"
                            type="number"
                            name="dob_year"
                            placeholder='YYYY'
                            required={true}
                            value={""}
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
                            checked={false}
                        />
                        <label htmlFor='man-gender-identity'>Supporter</label>
                        <input
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="man"
                            onChange={handleChange}
                            checked={false}
                        />

                        <label>Show Me</label>
                        <label htmlFor='woman-gender-interest'>Refugee</label>
                        <input
                            id="woman-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="man"
                            onChange={handleChange}
                            checked={false}
                        />
                        <label htmlFor='man-gender-interest'>Supporter</label>
                        <input
                            id="man-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="man"
                            onChange={handleChange}
                            checked={false}
                        />

                        <label htmlFor='about'>About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            onChange={handleChange}
                            placeholder="I like long walks along the beach!"
                            value={""}
                        />
                    </section>
                </form>
            </div>
        </>
    )
}
export default Onboarding