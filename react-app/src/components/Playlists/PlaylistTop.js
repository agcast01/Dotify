import { useState } from "react"
import { useSelector } from "react-redux"
import DeletePlaylistModal from "./DeletePlaylistModal"
import EditPlaylistModal from "./EditPlaylistModal"

function PlaylistTop({playlistId}) {
    const user = useSelector(state => state.session.user)
    const playlists = useSelector(state => state.playlists)
    const playlist = playlists[playlistId]
    const [showEditModal, setShowEditModal]= useState(false)
    const [showModal, setShowModal] = useState(false)
    const [options, setOptions] = useState(false)


    const title = () => {
        if ( user !== null && user.username === playlist.user) {
            return (
                <>
                    <h1 onClick={() => setShowEditModal(true)} id='editable-title'>{playlist.title}</h1>
                    {showEditModal && <EditPlaylistModal song={playlist} setShowEditModal={setShowEditModal} isSong={false}/>}
                </>
            )
        } return false
    }
    return (
        <div>
        <div className="playlist-info">
            <span className='playlist-image' style={{'backgroundImage': `url(${playlist.imageUrl})`}}>
            </span>
            <span className="playlist-data">
                <p>PLAYLIST</p>
                {title() || <h1>{playlist.title}</h1>}
                {playlist.description && <p className="description">{playlist.description}</p>}
                <p className="playlist-stats">{playlist.user} • {playlist.songs.length} songs</p>
            </span>
        </div>
        {showModal && <DeletePlaylistModal song={playlist} setShowModal={setShowModal} />}
            { playlist.user === user.username && <div className="drop-div">
                <button className="more-options" onClick={() => setOptions(!options)}>...</button>
                {options && (
                    <div id="options">
                        <button onClick={() => setShowEditModal(true)}>Edit Details</button>
                        <button onClick={() => setShowModal(true)}>Delete</button>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default PlaylistTop