import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-b31e6.firebaseio.com/',

});

export default instance;