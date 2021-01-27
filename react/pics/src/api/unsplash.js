import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        // access key from unsplash api gets passed as header through here
        Authorization: ''
    }
});