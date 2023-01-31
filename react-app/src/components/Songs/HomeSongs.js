import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function HomeSongs() {
    const songs = useSelector(state => state.songs)
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
            {Object.keys(songs).map(playlistId => (
                <div className="home-card" onClick={() => history.push(`/songs/${playlistId}`)}>
                    {playlistImage(songs[playlistId])}
                    <p className="title">{songs[playlistId].title}</p>
                    <p>{songs[playlistId].user}</p>
                </div>
            ))}
        </div>
    )
}

export default HomeSongs