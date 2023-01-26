import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as songReducer from '../../store/song'

function EditSongModal({ song , setShowEditModal }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState(song.title)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(songReducer.update({title, userId : user.id}, song.id))
        setShowEditModal(false)
    }
    return (
        <div className="modal-background">
            <div className='modal edit'>
                <div className="modal-header">
                    <h3>Edit Details</h3>
                    <button className="cancel-button" onClick={() => setShowEditModal(false)}>x</button>
                </div>
                <form className="edit-form" onSubmit={handleSubmit}>
                    <div id="edit-image"></div>
                    <input
                        id="edit-name"
                        placeholder="Add a name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        id="edit-description"
                        placeholder="Add an optional description"
                    />
                    <button type="submit" id="edit-save">Save</button>
                    <div id="edit-disclaimer">By proceeding, you agree to give Dotify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
                </form>
            </div>
        </div>
    )
}

export default EditSongModal