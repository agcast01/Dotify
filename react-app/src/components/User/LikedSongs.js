import { useSelector } from "react-redux";
import Songs from "../Songs/Songs";
import LikedSongsTop from "./LikedSongsTop";
import { Redirect } from "react-router-dom";


function LikedSongs({setPath}) {
    const user = useSelector(state => state.session.user)
    

    if (user === null) return <Redirect to='/' />
    setPath(`/liked-songs`)
    return (
        <div>
            <LikedSongsTop />
            {user.likedSongs.length ? <Songs songs={user.likedSongs} />: <h2>Start liking some songs</h2>}
        </div>
    )
}

export default LikedSongs