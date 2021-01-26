import React from 'react';
import unsplash from '../api/unsplash'; 
import SearchBar from './SearchBar';

class App extends React.Component {
    state = { images: [] };
    // async goes in front of method name, await goes before whatever is causing wait, set it to variable
    onSearchSubmit = async term => {
        // api get request
        const response = await unsplash.get('/search/photos', {
            params: {
                query: term
            }
        })
        // can use async await instead of below
        // .then((response) => {
        //     console.log(response.data.results)
        // });
        this.setState({ images: response.data.results });
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
            {/* onSubmit below can be called anything */}
            <SearchBar onSubmit={this.onSearchSubmit} />
            Found: {this.state.images.length} images
        </div>
        );
    }
}

export default App;