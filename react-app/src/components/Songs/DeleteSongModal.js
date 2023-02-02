import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from '../../store/session'
import * as songReducer from '../../store/song'
import * as albumReducer from '../../store/album'
import { SongContext } from '../Providers/SongContext'

function DeleteSong({song, setShowModal}) {
    const {currentSong, setCurrentSong} = useContext(SongContext)
    const dispatch = useDispatch()
    const history= useHistory()
    const deleteSong = async (id) => {
        
        await dispatch(songReducer.remove(id))
        await dispatch(authenticate())
        await dispatch(albumReducer.load())
        history.push('/user/songs')
        if(currentSong === song) setCurrentSong('')
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <h2>Delete Song?</h2>
                <p>This will delete {song.title} from Dotify.</p>
                <div className="modal-buttons">
                    <button className="modal-button" id="cancel" onClick={()=>setShowModal(false)}>Cancel</button>
                    <button className="modal-button" id="delete" onClick={() => deleteSong(song.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSong