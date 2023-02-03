
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const NavBar = ({path, setPath}) => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const likedSongs = useRef(null)

  useEffect(() => {
    if(user === null) {
      likedSongs.current.disabled = true;
    }
  }, [user])
  

  return (
    <nav>
      <ul className='sidebar-links'>
        <li>

          <button onClick={() => { history.push('/'); setPath('/') }} className={path === '/' ? 'sidebar-link active' : 'sidebar-link'}>
            <span className="material-symbols-outlined home">
              home
            </span>
            <span>Home</span>
          </button>
        </li>
        <li>

          <button onClick={() => { history.push('/search'); setPath('/search') }} className={path === '/search' ? 'sidebar-link active' : 'sidebar-link'}>
            <span className="material-symbols-outlined">
              search
            </span>

            <span>Search</span>
          </button>
        </li>
        <li>
          <button ref={likedSongs} onClick={() => { history.push('/user/songs'); setPath('/user/songs') }} className={path === '/user/songs' ? 'sidebar-link active' : 'sidebar-link'} style={user=== null ? {'cursor': 'not-allowed'}: {'cursor': 'pointer'}}>
            <span className="material-symbols-outlined">
              album
            </span>
            <span>Your Songs</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
