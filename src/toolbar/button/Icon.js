import React from 'react'

function Icon({ name }) {
    return(
        <span className="button" data-active={true}>
            <span className="material-icons">{name}</span>
        </span>
    );
}

export default Icon;
