import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import DeleteSong from "./DeleteSongModal"
import EditSongModal from "./EditSongModal"
import './songs.css'
import * as playlistReducer from '../../store/playlist'

function SingleSong({ setPath }) {
    const dispatch = useDispatch()
    setPath('/users/:songId')
    const { songId } = useParams()
    const songs = useSelector(state => state.songs)
    const user = useSelector(state => state.session.user)
    const song = songs[songId]

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [options, setOptions] = useState(false)
    const [showPlaylists, setShowPlaylists] = useState(false)


    const title = () => {
        if ( user !== null && user.username === song.user) {
            return (
                <>
                    <h1 onClick={() => setShowEditModal(true)} id='editable-title'>{song.title}</h1>
                    {showEditModal && <EditSongModal song={song} setShowEditModal={setShowEditModal} />}
                </>
            )
        } return false
    }

    async function addToPlaylist(playlistId) {
        await dispatch(playlistReducer.addSong(song.id, playlistId))
    }

    return (
        <div>
            <div className="playlist-header">
                <div className="playlist-info">
                    <div className='album-pic'></div>
                    <div className="playlist-data">
                        <p>Song</p>
                        {title() || <h1 >{song.title}</h1>}
                        <p>{song.user}</p>
                    </div>

                </div>
            </div>

            {showModal && <DeleteSong song={song} setShowModal={setShowModal} />}
            { song.user === user.username && <div className="drop-div">
                <button className="more-options" onClick={() => setOptions(!options)}>...</button>
                {options && (
                    <div id="options">
                        <button onClick={() => setShowEditModal(true)}>Edit Details</button>
                        <button onClick={() => setShowPlaylists(!showPlaylists)}>Add to Playlist</button>
                        <button onClick={() => setShowModal(true)}>Delete</button>
                        {showPlaylists && (
                            <div id="playlist-list">
                                {user.playlists.map(playlist => (
                                    <button onClick={() => addToPlaylist(playlist.id)}>{playlist.title}</button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>}


        </div>
    )
}

export default SingleSong