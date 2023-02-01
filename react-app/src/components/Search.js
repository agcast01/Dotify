import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


function Search() {
    const history = useHistory()

    const [query, setQuery] = useState('')
    const albums = useSelector(state => state.albums)
    const songs = useSelector(state => state.songs)
    const playlists = useSelector(state => state.playlists)

    const [filteredAlbums, setFilteredAlbums] = useState([])
    const [filteredSongs, setFilteredSongs] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])

    useEffect(() => {
        if(Object.values(albums).length) setFilteredAlbums(Object.values(albums).filter(album => album.title.toLowerCase().includes(query.toLowerCase())))
        if(Object.values(songs).length) setFilteredSongs(Object.values(songs).filter(song => song.title.toLowerCase().includes(query.toLowerCase())))
        if(Object.values(playlists).length) setFilteredPlaylists(Object.values(playlists).filter(playlist => playlist.title.toLowerCase().includes(query.toLowerCase())))
    }, [query, albums, songs, playlists])

    return (
        <div>
            <div id='search-bar'>
                <span class="material-symbols-outlined" id="search-icon">search</span>
                <input type='search' id='search' onChange={e => setQuery(e.target.value)} placeholder="What do you want to listen to?"/>
            </div>
            {!query && <h2>Find what you want to listen to.</h2>}
            {query && (
                <div>
                    {Boolean(filteredAlbums.length) && (
                        <div>
                            <h3>Albums</h3>
                            <div>{filteredAlbums.map(album => (
                                <div className="home-card" onClick={() => history.push(`/albums/${album}`)}>
                                <img src={album.imageUrl} alt='Album' className='card-image' />
                                <p className="title">{album.title}</p>
                                <p>{album.user}</p>
                            </div>
                            ))}</div>
                        </div>
                    )}
                    {Boolean(filteredSongs.length) && (
                        <div>
                            <h3>Songs</h3>
                            <div>{filteredSongs.map(song => (
                                <div className="home-card" onClick={() => history.push(`/songs/${song}`)}>
                                <img src={song.imageUrl} alt='Album' className='card-image' />
                                <p className="title">{song.title}</p>
                                <p>{song.user}</p>
                            </div>
                            ))}</div>
                        </div>
                    )}
                    {Boolean(filteredPlaylists.length) && (
                        <div>
                            <h3>Playlists</h3>
                            <div>{filteredPlaylists.map(playlist => (
                                <div className="home-card" onClick={() => history.push(`/playlists/${playlist}`)}>
                                <img src={playlist.imageUrl} alt='Playlist' className='card-image' />
                                <p className="title">{playlist.title}</p>
                                <p>{playlist.user}</p>
                            </div>
                            ))}</div>
                        </div>
                    )}
                    {(!filteredAlbums.length && !filteredPlaylists.length && !filteredSongs.length) && <h2>Nothing matches that search</h2>}
                </div>

                
            )}
        </div>
    )
}

export default Search