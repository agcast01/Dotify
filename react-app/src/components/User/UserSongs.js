import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { ThemeContext } from "../Providers/ThemeProvider"
import Songs from "../Songs/Songs"
import * as songReducer from '../../store/song'
function UserSongs() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {setTheme} = useContext(ThemeContext)
    setTheme('red')

    useEffect( () => {
        ( async () => {
            await dispatch(songReducer.loadUser(user.id))
            
        })();
    }, [dispatch, user])
    if(user === null) return <Redirect to="/" />

    return (
        <div>
            <Songs/>
        </div>
    )
}

export default UserSongs