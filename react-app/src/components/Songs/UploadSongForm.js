import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { authenticate } from "../../store/session"
import * as songReducer from '../../store/song'

function UploadSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [fileError, setFileError] = useState('')
    const [description, setDescription] = useState('')
    const [song, setSong] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData()
        formData.append('song', song)
        formData.append("title", title);
        formData.append("userId", user.id)
        formData.append('description', description)
        
        if(!song.name.endsWith('.mp3') && !song.name.endsWith('.wav')) {
            return setFileError('You must upload either an mp3 or wav file')
        } else {
            setFileError('')
        }

        await dispatch(songReducer.upload(formData))
        await dispatch(authenticate())
        return history.push('/user/songs')
    }

    if(user === null) return <Redirect to={'/login'}/>
    return (
        <>
            <div>Dotify</div>
            <form className="form" id="song-form" onSubmit={handleSubmit}>
                <h3>Start your artistic journey here</h3>
                <div>
                    <label>What is the title of your song?</label>
                    <input 
                        placeholder="Enter your title here."
                        value={title}
                        accept='audio/*'
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Enter the description of your song</label>
                    <textarea 
                        placeholder='Optional: Enter your description here.'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Upload your file</label>
                    <input 
                        type="file"
                        onChange={e => setSong(e.target.files[0])}
                    />
                    {fileError && <p className="error">{fileError}</p>}
                </div>
                <button type='submit' className="login-button">Upload your song</button>
                <button className="login-button" onClick={() => history.push('/user/songs')}>Cancel</button>
            </form>
        </>
    )
}

export default UploadSongForm