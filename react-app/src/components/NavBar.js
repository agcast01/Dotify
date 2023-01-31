
import React from 'react';
import { useHistory } from 'react-router-dom';


const NavBar = ({path, setPath}) => {
  const history = useHistory()

  

  return (
    <nav>
      <ul className='sidebar-links'>
        <li>

          <button onClick={() => { history.push('/home'); setPath('/') }} className={path === '/' ? 'sidebar-link active' : 'sidebar-link'}>
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
{/*         <li>

          <button onClick={() => { history.push('/library')}} className={path === '/library' ? 'sidebar-link active' : 'sidebar-link'}>
            <span className="material-symbols-outlined" id='library-icon'>
              web_stories
            </span>
            <span>Your Library</span>
          </button>
        </li> */}
        <li>
          <button onClick={() => { history.push('/user/songs'); setPath('/user/songs') }} className={path === '/user/songs' ? 'sidebar-link active' : 'sidebar-link'}>
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
