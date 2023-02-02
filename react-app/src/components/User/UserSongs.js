import {  useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Songs from "../Songs/Songs"
import UserTop from "./UserTop"

function UserSongs({setPath}) {
    setPath('/user/songs')
    const user = useSelector(state => state.session.user)
/*     const {setTheme} = useContext(ThemeContext)
    setTheme('red') */

    if(user === null) return <Redirect to="/" />

    return (
        <div>
            <UserTop />
            <Songs songs={user.songs}/>
        </div>
    )
}

export default UserSongs