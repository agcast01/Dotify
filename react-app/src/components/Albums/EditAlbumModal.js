import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as albumReducer from '../../store/album'
import * as songReducer from '../../store/song'
import { authenticate } from "../../store/session"

function EditAlbumModal({album, setShowEditModal}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState(album.title)
    const [description, setDescription] = useState(album.description)
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(album.imageUrl || 'none')
    const [validationErrors, setValidationErrors] = useState([])
    const [preview, setPreview] = useState('')

    function checkExt(name) {
        const allowed = ['png', 'jpg', 'jpeg']
        for (let ext of allowed) {
            if (name.toLowerCase().endsWith(ext)) return false
        }
        return true
    }

    useEffect(() => {
        if(image) {
            setPreview(URL.createObjectURL(image))
        } else setPreview('')
    }, [image])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let currErrors = []

        if(image && checkExt(image.name)) currErrors.push('The file must be a png, jpg, or jpeg file.')
        if(!title.length || !title.replace(/\s/g, '').length) currErrors.push('Must have a title.')
        if(title.length > 30) currErrors.push('Title must be less than 30 characters')
        if(description.length > 255) currErrors.push('Description must be less than 256 characters')
        setValidationErrors(currErrors)
        if (currErrors.length) return null

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('userId', user.id)
        await dispatch(albumReducer.update(formData, album.id))
        await dispatch(authenticate())
        await dispatch(songReducer.load())
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
                    <div id="edit-image" onClick={() => document.getElementById('selected-file').click()} style={{'backgroundImage': `url(${preview || imageUrl})`, 'cursor': 'pointer'}}>
                        <input id="selected-file" accept="image/*" class="edit-image" type="file" onChange={e => {setImage(e.target.files[0]); setImageUrl(image.name)}} />
                    </div>
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

export default EditAlbumModal