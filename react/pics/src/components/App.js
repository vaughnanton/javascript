import React from 'react';
import axios from 'axios'; 
import SearchBar from './SearchBar';

class App extends React.Component {
    onSearchSubmit(term) {
        // api get request
        axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: term
            },
            headers: {
                Authorization: 'Client-ID K-SKeoobwW5XYe3r31i1nxSmXASWJzugcS4WE-J9JeA'
            }
        });
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
            {/* onSubmit below can be called anything */}
            <SearchBar onSubmit={this.onSearchSubmit} />
        </div>
        );
    }
}

export default App;