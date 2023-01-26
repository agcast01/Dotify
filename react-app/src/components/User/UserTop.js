import { useSelector } from "react-redux"

function UserTop() {
    const user = useSelector(state => state.session.user)
    const songs = useSelector(state => state.song)
    return (
        <>
            <span className='playlist-image'>
                <span className="material-symbols-outlined">
                    album
                </span>
            </span>
            <span className="playlist-data">
                <p>PLAYLIST</p>
                <h1>Your Songs</h1>
                <p>{user.username} • {user.songs.length} songs</p>
            </span>
        </>
    )
}

export default UserTop