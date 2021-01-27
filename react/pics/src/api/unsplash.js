import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID K-SKeoobwW5XYe3r31i1nxSmXASWJzugcS4WE-J9JeA'
    }
});