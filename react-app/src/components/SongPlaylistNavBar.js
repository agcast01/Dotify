function SongPlaylistNavBar() {
    return (
        <div className="song-navbar">
            <ul>
                <li>
                    <button className="sidebar-link">
                        <span className="material-symbols-outlined" id='create-icon'>
                            add
                        </span>
                        <span>
                            Create Playlist
                        </span>
                    </button>
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