import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { SongContext } from "../Providers/SongContext"

function CreateAlbumForm(){

    const history = useHistory()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription]= useState('')
    const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] =  useState([])

    function onSubmit(e) {
        e.preventDefault()
        const errors = []
        if(!title || !title.replace(/\s/g, '').length) errors.push("Title is required")
        if (errors.length) return setValidationErrors(errors)
    }

   return (<>
        <div>Dotify</div>
        <form className="form" onSubmit={onSubmit}>
            <h3>Upload your new album here</h3>
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
                <label>Upload your album's image here</label>
                <input 
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    accept='image/*'
                />
            </div>
            <button type="submit" className="login-button" disabled={validationErrors.length}>Create your album</button>
            <button className="login-button" onClick={() => history.push('/')}>Cancel</button>
        </form>
    </>)
}

export default CreateAlbumForm