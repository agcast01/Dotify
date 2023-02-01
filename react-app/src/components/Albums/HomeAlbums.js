import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function HomeAlbums() {
    const albums = useSelector(state => state.albums)
    const history = useHistory()
    function albumImage(album) {
        if (album.imageUrl) return <img src={album.imageUrl} alt='Album' className='card-image' />
        return (
            <div className="no-image"><span class="material-symbols-outlined">
                music_note
            </span></div>
        )
    }
    return (
        <div className="card-container">
            {Object.keys(albums).map(albumId => (
                <div className="home-card" onClick={() => history.push(`/albums/${albumId}`)}>
                    {albumImage(albums[albumId])}
                    <p className="title">{albums[albumId].title}</p>
                    <p>{albums[albumId].user}</p>
                </div>
            ))}
        </div>
    )
}

export default HomeAlbums