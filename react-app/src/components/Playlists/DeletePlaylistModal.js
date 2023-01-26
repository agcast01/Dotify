import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as playlistReducer from '../../store/playlist'
import { authenticate } from '../../store/session'

function DeletePlaylistModal({song: playlist, setShowModal}) {
    const dispatch = useDispatch()
    const history= useHistory()
    const deleteSong = async (id) => {
        await dispatch(playlistReducer.remove(id))
        await dispatch(authenticate())
        history.push('/library')
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <h2>Delete Playlist?</h2>
                <p>This will delete {playlist.title} from Dotify.</p>
                <div className="modal-buttons">
                    <button className="modal-button" id="cancel" onClick={()=>setShowModal(false)}>Cancel</button>
                    <button className="modal-button" id="delete" onClick={() => deleteSong(playlist.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePlaylistModal