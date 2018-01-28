import React from 'react';


const folder = (props) => {
    const {handleTextChange} = props;
    return (
        <div className="dir">
            <label className="dir__label">Folder Name: </label>
            <input className="dir__input" onChange={handleTextChange}/>
        </div>)
}

export default folder;