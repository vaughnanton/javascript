import axios from 'axios';

const KEY = 'AIzaSyCu3RFeCUAgozS4M5Z-gksgd8uc4_WRW0g';

// preconfigure axios query to youtube api
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
});
