import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { authenticate } from "../../store/session"
import * as songReducer from '../../store/song'
import { SongContext } from "../Providers/SongContext"

function UploadSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {setCurrentSong} = useContext(SongContext)
    setCurrentSong('')
    const [title, setTitle] = useState('')
    const [fileError, setFileError] = useState('')
    const [description, setDescription] = useState('')
    const [song, setSong] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        setErrors([])
    }, [song, title])

    const handleSubmit = async(e) => {
        e.preventDefault();
        let error = [];

        const formData = new FormData()
        formData.append("song", song)
        formData.append("title", title);
        formData.append("userId", user.id)
        formData.append('description', description)

        if(!title || !title.replace(/\s/g, '').length) error.push("Title is required")
        if(!song) error.push('Song is required')
        if(error.length) return setErrors(error)
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
                    {errors.includes('Title is required') && <p className="error">Title is required</p>}
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
                    {errors.includes('Song is required') && <p className="error">Song is required</p>}
                    {fileError && <p className="error">{fileError}</p>}
                </div>
                <button type='submit' disabled={Boolean(errors.length)} className="login-button">Upload your song</button>
                <button className="login-button" onClick={() => history.push('/user/songs')}>Cancel</button>
            </form>
        </>
    )
}

export default UploadSongForm