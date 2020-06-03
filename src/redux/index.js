import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import axios from 'axios'

const initialState = {
    weather: {},
    dailyPlots: [],
    hourlyPlots: [],
    currentTemp: 0,
    modeIndex: 1,
    graphModes: ['daily', 'hourly'],
    isLoading: true,
    isNewsLoading: true,
    articles: {},
    location: { lat: '39.9042', lng: '116.4074' },
    locationActive: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            const { weather, locationActive } = action
            return {
                ...state,
                weather,
                currentTemp: weather.currently.temperature,
                hourlyPlots: createHourlyPlots(weather.hourly.data),
                dailyPlots: createDailyPlots(weather.daily.data),
                isLoading: false,
                locationActive
            }
        case 'TOGGLE_MODE':
            return {
                ...state,
                modeIndex:
                    state.modeIndex === 0
                        ? state.modeIndex + 1
                        : state.modeIndex - 1
            }
        case 'CHANGE_LOCATION':
            const { lat, lng } = action.location
            return {
                ...state,
                location: { lat, lng }
            }
        case 'GET_NEWS':
            return {
                ...state,
                articles: action.articles
            }
        case 'SWITCH_CATEGORY':
            return {
                ...state,
                articles: action.articles,
                isNewsLoading: false
            }
        default:
            return state
    }
}

const createHourlyPlots = data => {
    const hourlyPlots = []
    for (let i = 0; i < 8; i++) {
        const date = new Date(data[i].time * 1000)
        hourlyPlots.push({ x: date, y: data[i].temperature })
    }
    return hourlyPlots
}

const createDailyPlots = data => {
    return data.map(day => {
        const date = new Date(day.time * 1000)
        const tempAvg = (day.temperatureHigh + day.temperatureLow) / 2
        return { x: date, y: tempAvg }
    })
}

export const toggleMode = () => {
    return {
        type: 'TOGGLE_MODE'
    }
}
const weatherAPIKey = '15d7d4d439f6c0a565d82cfc94fe22a8'
const { lat, lng } = initialState.location
const weatherUrl = `https://vschool-cors.herokuapp.com?url=https://api.darksky.net/forecast/${weatherAPIKey}`
export const getWeather = (lati = lat, lon = lng, locationActive) => {
    return dispatch => {
        if (!locationActive) {
            locationActive = false
        }
        axios
            .get(`${weatherUrl}/${lati},${lon}`)
            .then(response => {
                dispatch({
                    type: 'GET_WEATHER',
                    weather: response.data,
                    locationActive
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// GEOLOCATOR
const googleAPIKey = 'AIzaSyDVRbJJDt-Ard7WL5oJGimjVLhOKHcYrWU'
const geolocatorUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleAPIKey}`
export const changeLocation = locationActive => {
    return dispatch => {
        axios
            .post(geolocatorUrl)
            .then(response => {
                const { location } = response.data
                dispatch(getWeather(location.lat, location.lng, locationActive))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const dispatchNewsRequest = (category, dispatch) => {
    axios.get(newsUrlBeginning + category + newsUrlEnd).then(response => {
        dispatch({
            type: 'GET_NEWS',
            articles: response.data.articles
        })
    })
}

// REMEMBER TO USE ATTRIBUTION LINK //
const newsAPIKey = '181d29365cb24d89aa4cf86a3fa61cca'
const newsUrlBeginning = `https://newsapi.org/v2/top-headlines?country=us&category=`
const newsUrlEnd = `&apiKey=${newsAPIKey}`
export const getNews = () => {
    return dispatch => {
        dispatchNewsRequest('general', dispatch)
    }
}

export const switchCategory = category => {
    return dispatch => {
        dispatchNewsRequest(category, dispatch)
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
