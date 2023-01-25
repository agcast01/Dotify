
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const NavBar = () => {
  const history = useHistory()

  const [path, setPath] = useState(window.location.pathname)

  return (
    <nav>
      <ul className='sidebar-links'>
        <li>

          <button onClick={() => {history.push('/'); setPath('/')}} className={path === '/'? 'sidebar-link active' :'sidebar-link'}>
            <span class="material-symbols-outlined home">
              home
            </span>
            <span>Home</span>
          </button>
        </li>
        <li>

          <button onClick={() => {history.push('/search'); setPath('/search')}}  className={path === '/search'? 'sidebar-link active' :'sidebar-link'}>
            <span class="material-symbols-outlined">
              search
            </span>

            <span>Search</span>
          </button>
        </li>
        <li>

          <button onClick={() => {history.push('/library'); setPath('/library')}} className={path === '/library'? 'sidebar-link active' :'sidebar-link'}>
            <span class="material-symbols-outlined" id='library-icon'>
              web_stories
            </span>
            <span>Your Library</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
