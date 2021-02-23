import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [text]);



    useEffect(() => {
        const doTranslation = async () => {
            // destructure out data from response
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: ''
                },
            })
            
            setTranslated(data.data.translations[0].translatedText);
        };
        // will invoke at mounting or changing of language/text
        doTranslation();
    }, [language, debouncedText]);
    
    return (
        <div className="ui header">
            {translated}
        </div>
    )
};

export default Convert;