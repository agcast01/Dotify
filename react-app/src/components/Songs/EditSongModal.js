import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticate } from "../../store/session"
import * as songReducer from '../../store/song'

function EditSongModal({ song, setShowEditModal }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let currErrors = []

        if(!title.length || !title.replace(/\s/g, '').length) currErrors.push('Must have a title.')
        if(title.length > 30) currErrors.push('Title must be less than 30 characters')
        if(description.length > 255) currErrors.push('Description must be less than 256 characters')
        setValidationErrors(currErrors)
        if (currErrors.length) return null
        await dispatch(songReducer.update({ title, userId: user.id, description }, song.id))
        await dispatch(authenticate())
        setShowEditModal(false)
    }

    return (
        <div className="modal-background">
            <div className='modal edit'>
                <div className="modal-header">
                    <h3>Edit Details</h3>
                    <button className="cancel-button" onClick={() => setShowEditModal(false)}>x</button>
                </div>
                <ul className="edit-error">
                    {validationErrors.map(error => (
                        <li key={error} className='error'>{error}</li>
                    ))}
                </ul>
                <form className="edit-form" onSubmit={handleSubmit}>
                    <div id="edit-image" style={{'background-image': `url(${song.imageUrl})`}}></div>
                    <input
                        id="edit-name"
                        placeholder="Add a name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        id="edit-description"
                        placeholder="Add an optional description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button type="submit" id="edit-save">Save</button>
                    <div id="edit-disclaimer">By proceeding, you agree to give Dotify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
                </form>
            </div>
        </div>
    )
}

export default EditSongModal