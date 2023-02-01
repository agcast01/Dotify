import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

function YourAlbums() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    if (user === null) return <Redirect to={'/'} />

    return (
        <div>
            <div></div>
            <div className="card-container">
                {user.albums.map(album => (
                    <div className="home-card" onClick={() => history.push(`/albums/${album.id}`)}>
                        <img className="card-image" alt='Album' src={album.imageUrl} />
                        <p className="title">{album.title}</p>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default YourAlbums