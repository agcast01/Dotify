import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dislike, like } from "../../store/session"

function Songs({ songs }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    let i = 0

    function checkLiked(songId) {
        for (let song of user.likedSongs) {
            if (song.id === songId) {
                return true
            }
        }
        return false
    }

    async function likeSong(songId) {
        if (!checkLiked(songId)) {
            await dispatch(like(songId, user.id))
            return
        }
        await dispatch(dislike(songId, user.id))
    }
    
    return (
        <div>
            <div className="column-headers">
                <p>#</p>
                <p>TITLE</p>
                <p>ALBUM</p>
                <p>DATE ADDED</p>
                <span className="material-symbols-outlined empty" id="clock">
                    schedule
                </span>
            </div>
            <ul className="songs">
                {songs.map(song => (
                    <li className='song' key={song.id}>
                        <p>{++i}</p>
                        <div>
                            <Link to={`/songs/${song.id}`} className="title">{song.title}</Link>
                        </div>
                        <div>
                            <Link to={`/albums/${song.albumId}`} className="title">{song.albumTitle}</Link>
                        </div>
                        <p>Placeholder</p>
                        <div>
                            {user !== null && <button className={checkLiked(song.id) ? "liked" : "not-liked"} onClick={() => likeSong(song.id)}><span className="material-symbols-outlined">
                            favorite
                        </span></button>}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Songs