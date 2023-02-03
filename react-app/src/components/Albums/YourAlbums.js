import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

function YourAlbums({setPath}) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    setPath('/your-albums')
    if (user === null) return <Redirect to={'/'} />

    return (
        <div>
            <h1>Your Albums</h1>
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