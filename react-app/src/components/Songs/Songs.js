import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Songs() {
    let songs = useSelector(state => state.song);
    
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
                {Object.keys(songs).map((songId, i=1) =>(
                    <li className='song' key={songId}>
                       <p>{i}</p>
                       <div>
                            <Link to={`/songs/${songId}`} className="title">{songs[songId].title}</Link>
                        </div>
                        <p>Placeholder</p>
                        <p>Placeholder</p>
                        <p>Placeholder</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Songs