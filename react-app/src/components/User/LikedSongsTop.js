import { useSelector } from "react-redux"

function LikedSongsTop() {
    const user = useSelector(state => state.session.user)

    return (
        <div id="likes-top">
            <span className='liked-image'>
                <span className="material-symbols-outlined" id="user-album">
                    favorite
                </span>
            </span>
            <span className="playlist-data">
                <p>PLAYLIST</p>
                <h1>Liked Songs</h1>
                <p>{user.username} • {user.likedSongs.length} songs</p>
            </span>
        </div>)
}

export default LikedSongsTop