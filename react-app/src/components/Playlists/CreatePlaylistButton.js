import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as playlistReducer from '../../store/playlist'

function CreatePlaylistButton() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    
    const [signUp, toggleSignUp] = useState(false)

    async function handleClick() {
        if( user === null ) return toggleSignUp(!signUp)

        await dispatch()

    }

    return (
        <>
            <button className="sidebar-link" onClick={handleClick}>
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