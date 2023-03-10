import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { SongContext } from "../Providers/SongContext"
import * as albumReducer from '../../store/album'
import { authenticate } from "../../store/session"

function CreateAlbumForm(){
    const {setCurrentSong} = useContext(SongContext)
    setCurrentSong('')
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const uploadButton = useRef(null)

    const [title, setTitle] = useState('')
    const [description, setDescription]= useState('')
    const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] =  useState([])
    const [preview, setPreview] = useState('')

    function checkExt(name) {
        const allowed = ['png', 'jpg', 'jpeg']
        for (let ext of allowed) {
            if (name.toLowerCase().endsWith(ext)) return false
        }
        return true
    }

    useEffect(() => {
        setValidationErrors([])
    }, [title])

    useEffect(() => {
        if(image) {
            setPreview(URL.createObjectURL(image))
        }
    }, [image])

    async function onSubmit(e) {
        e.preventDefault()
        const errors = []
        if(image && checkExt(image.name)) errors.push('The file must be a png, jpg, or jpeg file.')
        if(!title || !title.replace(/\s/g, '').length) errors.push("Title is required")
        if(title.length > 30) errors.push('Title must be less than 30 characters')
        if(description.length > 255) errors.push('Description must be less than 256 characters')
        setValidationErrors(errors)
        if (errors.length) return 
        
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('userId', user.id)

        uploadButton.current.disabled = true
        const newAlbum = await dispatch(albumReducer.create(formData))
        await dispatch(authenticate())
        history.push(`/albums/${newAlbum.id}`)
    }

    if (user === null) return <Redirect to={'/'}/>

   return (<>
        <div>Dotify</div>
        <form className="form" onSubmit={onSubmit}>
            <h3>Upload your new album here</h3>
            <ul>
                {validationErrors.map(error => (
                    <li className="error">{error}</li>
                ))}
            </ul>
            <div>
                <label>What is the title of your album?</label>
                <input
                    placeholder="Enter your title here."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                
            </div>
            <div>
                <label>Enter the description of your album</label>
                <textarea 
                    placeholder="Optional: Enter your description here."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Optional: Upload your album's image here</label>
                {preview && <img id="blah" src={preview} alt="Preview" />}
                <input 
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    accept='image/*'
                />
                
            </div>
            <button ref={uploadButton} type="submit" className="login-button" disabled={validationErrors.length}>Create your album</button>
            <button className="login-button" onClick={() => history.push('/')}>Cancel</button>
        </form>
    </>)
}

export default CreateAlbumForm