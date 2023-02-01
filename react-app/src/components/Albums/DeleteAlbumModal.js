import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as albumReducer from '../../store/album'
import * as songReducer from '../../store/song'
import { authenticate } from '../../store/session'

function DeleteAlbumModal({album, setShowModal}) {   
    const dispatch = useDispatch()
    const history= useHistory()
    const deleteSong = async (id) => {
        await dispatch(albumReducer.remove(id))
        await dispatch(authenticate())
        await dispatch(songReducer.load())
        await dispatch(albumReducer.load())
        history.push('/')
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <h2>Delete ALbum?</h2>
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