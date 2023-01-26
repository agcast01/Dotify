import CreatePlaylistButton from "./Playlists/CreatePlaylistButton"

function SongPlaylistNavBar() {
    return (
        <div className="song-navbar">
            <ul>
                <li>
                    <CreatePlaylistButton />
                </li>
                <li>
                    <button className="sidebar-link">
                        <span className="material-symbols-outlined" id='liked-icon'>
                            favorite
                        </span>
                        <span>
                            Liked Songs
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default SongPlaylistNavBar