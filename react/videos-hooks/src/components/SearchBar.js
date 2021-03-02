import React, { useState } from 'react';

const SearchBar = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    // arrow funciton because it's gonna be passed to a child element
    const onInputChange = event => {
        setTerm(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        // call callback from parent component
        onFormSubmit(term);
    };

    return (
        <div className="ui segment search-bar">
            <form onSubmit={onSubmit} className="ui form">
                <div className="field">
                    <label>Video Search</label>
                    <input 
                        type="text" 
                        value={term} 
                        onChange={onInputChange}
                    />
                </div>
            </form>
        </div>
    )
};

export default SearchBar;