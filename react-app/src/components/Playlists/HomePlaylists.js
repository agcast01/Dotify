import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function HomePlaylists() {
    const playlists = useSelector(state => state.playlists)
    const history = useHistory()
    function playlistImage(playlist) {
        if (playlist.imageUrl) return <img src={playlist.imageUrl} alt='Playlist' className='card-image' />
        return (
            <div className="no-image"><span class="material-symbols-outlined">
                music_note
            </span></div>
        )
    }
    return (
        <div className="card-container">
            {Object.keys(playlists).map(playlistId => (
                <div className="home-card" onClick={() => history.push(`/playlists/${playlistId}`)}>
                    {playlistImage(playlists[playlistId])}
                    <p className="title">{playlists[playlistId].title}</p>
                    <p>{playlists[playlistId].user}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePlaylists