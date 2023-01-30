import {  useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Songs from "../Songs/Songs"

function UserSongs({setPath}) {
    setPath('/user/songs')
    const user = useSelector(state => state.session.user)
/*     const {setTheme} = useContext(ThemeContext)
    setTheme('red') */

    if(user === null) return <Redirect to="/" />

    return (
        <div>
            <Songs songs={user.songs}/>
        </div>
    )
}

export default UserSongs