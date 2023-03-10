import { useSelector } from "react-redux"

function UserTop() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <span className='playlist-image'>
                <span className="material-symbols-outlined" id="user-album">
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