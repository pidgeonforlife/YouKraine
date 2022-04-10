import { useEffect, useState } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data)
        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        getUser()
        getGenderedUsers()
    }, [user, genderedUsers])

    // console.log('user ', user)
    // console.log('gendered users ', genderedUsers)

    console.log(genderedUsers)



    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }



    return (
        <>
            {user &&
                <div className='dashboard'>
                    <ChatContainer user={user} />
                    <div className='swipe-container'>
                        <div className='card-container'>

                            {genderedUsers?.map((genderedUser) =>
                                <TinderCard
                                    className='swipe'
                                    key={genderedUser.first_name}
                                    onSwipe={(dir) => swiped(dir, genderedUser.first_name)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                    <div
                                        style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                                        className='card'>
                                        <h3>{genderedUser.first_name}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className='swipe-info'>
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Dashboard