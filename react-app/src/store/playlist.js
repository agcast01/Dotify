const LOAD = 'playlist/LOAD'
const CREATE = 'playlist/CREATE'
const DELETE = 'song/DELETE'

const loadPlaylists = (playlists) => ({
    type: LOAD,
    payload: playlists
})

const createPlaylist = (playlist) => ({
    type: CREATE,
    payload: playlist
})

const deletePlaylist = (playlistId) => ({
    type: DELETE,
    payload: playlistId
})

export const load = () => async (dispatch) => {
    const response = await fetch('/api/playlists/')
    if(response.ok) {
        const data = await response.json()
        if(data.erros) return
        await dispatch(loadPlaylists(data))
    }
}

export const create = (data) => async (dispatch) => {
    const response = await fetch('/api/playlists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(createPlaylist(data))
        return data.id;
    } else if (response.status < 500) {
        const data = await response.json();
        if(data.errors) {
            return data.errors
        }
    } else return ['An error occurred. Please try again.']
}

export const update = (data, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        body: data
    })

    if(response.ok) {
        const final = await response.json()
        await dispatch(createPlaylist(final))
    }
}

export const remove = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE'
    })

    if ( response.ok ) {
        await dispatch(deletePlaylist(playlistId))
    }
}

const initialState= {}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOAD:
            return action.payload;
        case CREATE:{
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