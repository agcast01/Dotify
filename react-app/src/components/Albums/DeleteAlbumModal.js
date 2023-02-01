import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as albumReducer from '../../store/album'
import { authenticate } from '../../store/session'

function DeleteAlbumModal({album, setShowModal}) {   
    const dispatch = useDispatch()
    const history= useHistory()
    const deleteSong = async (id) => {
        await dispatch(albumReducer.remove(id))
        await dispatch(authenticate())
        history.push('/')
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <h2>Delete Playlist?</h2>
                <p>This will delete {album.title} from Dotify.</p>
                <div className="modal-buttons">
                    <button className="modal-button" id="cancel" onClick={()=>setShowModal(false)}>Cancel</button>
                    <button className="modal-button" id="delete" onClick={() => deleteSong(album.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlbumModal