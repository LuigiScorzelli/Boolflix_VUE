import axios from 'axios'

export default {
    getRequest (url, params) {
        return axios.get(url, {
            params
        })
    }
}