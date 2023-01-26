import { Link } from "react-router-dom";

function Songs({songs}) {
    let i = 0
    console.log(songs)
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