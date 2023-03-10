import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import DeleteSong from "./DeleteSongModal"
import EditSongModal from "./EditSongModal"
import './songs.css'
import * as playlistReducer from '../../store/playlist'
import { SongContext } from "../Providers/SongContext"
import { dislike, like } from "../../store/session"

function SingleSong({ setPath }) {
    const dispatch = useDispatch()
    const { setCurrentSong } = useContext(SongContext)
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
        if (user !== null && user.username === song.user) {
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

    function checkLiked(songId) {
        for (let song of user.likedSongs) {
            if (song.id === songId) {
                return true
            }
        }
        return false
    }

    async function likeSong() {
        if(!checkLiked(song.id)) {
            await dispatch(like(song.id, user.id))
            return
        }
        await dispatch(dislike(song.id, user.id))
    }

    if(!song) return null

    return (
        <div onClick={e =>{ e.stopPropagation(); setOptions(false)}}>
            <div className="playlist-header">
                <div className="playlist-info">
                    <img className='album-pic' src={song.imageUrl} alt='Album'/>
                    <div className="playlist-data">
                        <p>Song</p>
                        {title() || <h1 >{song.title}</h1>}
                        {song.description && <p className="description">{song.description}</p>}
                        <p className="playlist-stats">{song.user}</p>
                    </div>

                </div>
            </div>
            <div className="buttons">
                <button className="play-button" onClick={() => setCurrentSong(song)}><span className="material-symbols-outlined">
                    play_arrow
                </span></button>
                {user !== null && <button className={checkLiked(song.id)?"liked liked-main" : "not-liked not-liked-main"} 
                onClick={likeSong}
                ><span class="material-symbols-outlined">
                    favorite
                </span></button>}
                {showModal && <DeleteSong song={song} setShowModal={setShowModal} />}
                {user !== null && song.user === user.username && <div className="drop-div">
                    <button className="more-options" onClick={(e) => {e.stopPropagation();setOptions(!options)}}>...</button>
                    {options && (
                        <div id="options" onMouseLeave={() => setOptions(false)}>
                            <span>
                                <button onClick={(e) => {e.stopPropagation(); setShowEditModal(true)}}>Edit Details</button>
                                <button onClick={(e) => {e.stopPropagation(); setShowPlaylists(!showPlaylists)}}>Add to Playlist</button>
                                <button onClick={(e) => {e.stopPropagation(); setShowModal(true)}}>Delete</button>
                            </span>
                            {showPlaylists && (
                                <span id="playlist-list">
                                    {user.playlists.map(playlist => (
                                        <button onClick={() => addToPlaylist(playlist.id)}>{playlist.title}</button>
                                    ))}
                                </span>
                            )}
                        </div>
                    )}
                </div>}
            </div>


        </div>
    )
}

export default SingleSong