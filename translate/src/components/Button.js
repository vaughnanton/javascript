import React from 'react';
import LanguageContext from '../context/LanguageContext';

class Button extends React.Component {
    // hook up context object to the file
    static contextType = LanguageContext;

    render() {
        const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
        return <button className="ui button primary">{text}</button>;
    }
}

export default Button;