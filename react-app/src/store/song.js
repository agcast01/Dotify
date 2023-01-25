const LOAD = 'song/LOAD'
const UPLOAD = 'song/UPLOAD'
const DELETE = 'song/DELETE'

const loadSongs = (users) => ({
    type: LOAD,
    payload: users
})

const uploadSong = (song) => ({
    type: UPLOAD,
    payload: song
})

const deleteSong = (songId) => ({
    type: DELETE,
    payload: songId
})

export const load = () => async (dispatch) => {
    const response = await fetch('/api/songs/');
    if(response.ok) {
        const data = await response.json();
        if(data.errors) return
        let songs = {}
        data.forEach(song => songs[song.id] = song);
        dispatch(loadSongs(songs))
    }
}

export const upload = (song) => async (dispatch) => {
    const response = await fetch('/api/songs/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(uploadSong(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if(data.errors) {
            return data.errors
        } 
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const remove = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSong(songId))
    }
} 

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return action.payload
        case UPLOAD: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE: {
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        }
        default:
            return state
    }
}