import React, { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { authenticate } from "../../store/session"
import * as songReducer from '../../store/song'
import * as albumReducer from '../../store/album'
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
    const [albumId, setAlbumId] = useState('new')
    const [length, setLength] = useState('')

    const uploadButton = useRef(null)

    useEffect(()=>{
        setErrors([])
        if (song){
            const reader = new FileReader()
    
            reader.onload = async function(e) {
                const audioContext = new window.AudioContext()
                await audioContext.decodeAudioData(e.target.result, function(buffer) {
                    const duration = buffer.duration;
                    setLength(getDuration(duration))
                    console.log(getDuration(duration))
                })
            }
    
            reader.readAsArrayBuffer(song)
        }
    }, [song, title])


    const handleSubmit = async(e) => {
        e.preventDefault();
        let error = [];
        if(!title || !title.replace(/\s/g, '').length) error.push("Title is required")
        if(title.length > 30) error.push("Title must be less than 30 characters")
        if(!song) error.push('Song is required')
        if(description.length > 255) error.push('Description must be less than 256 characters')
        if(error.length) return setErrors(error)
        if(!song.name.endsWith('.mp3') && !song.name.endsWith('.wav')) {
            return setFileError('You must upload either an mp3 or wav file')
        } else {
            setFileError('')
        }

        let newAlbumId
        if(albumId === 'new') {
            const albumForm = new FormData()
            albumForm.append('title', title)
            albumForm.append('userId', user.id)
            const newAlbum = await dispatch(albumReducer.create(albumForm))
            await dispatch(authenticate())
            newAlbumId = newAlbum.id
        }

        const formData = new FormData()
        formData.append("song", song)
        formData.append("title", title);
        formData.append("userId", user.id)
        formData.append('description', description)
        formData.append('albumId', newAlbumId || albumId)
        formData.append('length', length)

        
        uploadButton.current.disabled = true
        await dispatch(songReducer.upload(formData))
        await dispatch(albumReducer.load())
        await dispatch(authenticate())
        return history.push(`/albums/${newAlbumId || albumId}`)
    }

    function getDuration(time) {
        const seconds = Math.ceil(time)
        const minutes = Math.floor(seconds / 60)
        const remainder = Math.floor(seconds % 60)
        return `${minutes}:${remainder < 10 ? '0' + remainder : remainder}`
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
                        onChange={e => setTitle(e.target.value)}
                    />
                    {errors.includes('Title is required') && <p className="error">Title is required</p>}
                    {errors.includes('Title must be less than 30 characters') && <p className="error">Title must be less than 30 characters</p>}
                </div>
                <div>
                    <label>Enter the description of your song</label>
                    <textarea 
                        placeholder='Optional: Enter your description here.'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {errors.includes('Description must be less than 256 characters') && <p className="error">'Description must be less than 256 characters'</p>}
                </div>
                <div>
                    <label>Select the song's album</label>
                    <select onChange={e => setAlbumId(e.target.value)}>
                        <option value='new'>Create New Album</option>
                        {user.albums.map(album => (
                            <option value={album.id}>{album.title}</option>
                        ))}
                    </select>

                </div>
                <div>
                    <label>Upload your file</label>
                    <input 
                        type="file"
                        accept='audio/*'
                        onChange={e => setSong(e.target.files[0])}
                    />
                    {errors.includes('Song is required') && <p className="error">Song is required</p>}
                    {fileError && <p className="error">{fileError}</p>}
                </div>
                <button ref={uploadButton} type='submit' disabled={Boolean(errors.length)} className="login-button">Upload your song</button>
                <button className="login-button" onClick={() => history.push('/user/songs')}>Cancel</button>
            </form>
        </>
    )
}

export default UploadSongForm