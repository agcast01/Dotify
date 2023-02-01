import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as playlistReducer from '../../store/playlist'
import { authenticate } from '../../store/session'

function CreatePlaylistButton() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    
    const [signUp, toggleSignUp] = useState(false)

    async function handleClick() {
        if( user === null ) return toggleSignUp(!signUp)
        const title = `Playlist #${user.playlists.length + 1}`
        const userId = user.id
        const playlistId = await dispatch(playlistReducer.create({title, userId}))
        await dispatch(authenticate())
        history.push(`/playlists/${playlistId}`)

    }

    return (
        <>
            <button className={user === null ? 'sidebar-link disabled':"sidebar-link"} onClick={handleClick} style={user=== null ? {'cursor': 'not-allowed'}: {'cursor': 'pointer'}}>
                <span className="material-symbols-outlined" id='create-icon'>
                    add
                </span>
                <span>
                    Create Playlist
                </span>
            </button>
            
        </>
    )
}

export default CreatePlaylistButton