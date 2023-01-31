const LOAD = 'album/LOAD'
const CREATE = 'album/CREATE'
const DELETE = 'album/DELETE'

const loadAlbums = (albums) => ({
    type: LOAD,
    payload: albums
})

const createAlbum = (album) => ({
    type: CREATE,
    payload: album
})

const deleteAlbum = (albumId) => ({
    type: DELETE,
    payload: albumId
})

export const load = () => async (dispatch) => {
    const response = await fetch('/api/albums/')
    if(response.ok) {
        const data = await response.json()
        if(data.erros) return
        await dispatch(loadAlbums(data))
    }
}

export const create = (data) => async (dispatch) => {
    const response = await fetch('/api/albums/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(createAlbum(data))
        return data.id;
    } else if (response.status < 500) {
        const data = await response.json();
        if(data.errors) {
            return data.errors
        }
    } else return ['An error occurred. Please try again.']
}

export const update = (data, albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`, {
        method: 'PUT',
        body: data
    })

    if(response.ok) {
        const final = await response.json()
        await dispatch(createAlbum(final))
    }
}

export const addSong = (songId, albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({songId})
    })

    if(response.ok) {
        const final = await response.json()
        await dispatch(createAlbum(final))
    }
}

export const remove = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`, {
        method: 'DELETE'
    })

    if ( response.ok ) {
        await dispatch(deleteAlbum(albumId))
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