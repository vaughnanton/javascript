import React from 'react';

const Link = ( {className, href, children} ) => {
    const onClick = (event) => {
        event.preventDefault();
        // show the url update
        window.history.pushState({}, '', href);

        // tell the route components that the route changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a onClick={onClick} className={className} href={href}>
            {children}
        </a>
    )
};

export default Link;