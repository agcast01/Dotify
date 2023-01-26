import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as songReducer from '../../store/song'

function DeleteSong({song, setShowModal}) {
    const dispatch = useDispatch()
    const history= useHistory()
    const deleteSong = async (id) => {
        await dispatch(songReducer.remove(id))
        history.push('/user/songs')
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