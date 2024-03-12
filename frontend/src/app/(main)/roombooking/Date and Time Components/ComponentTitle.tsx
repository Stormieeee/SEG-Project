import React from 'react';
import {FORM_HEADER, ICON} from "./ComponentFormat";

const ComponentTitle = (props:{title : string, image : string, altImg : string}) => {
    return (
        <div className='flex mb-3'>
            <div className={FORM_HEADER}> {props.title} </div>
            <img className={ICON} src={props.image} alt={props.altImg}/>
        </div>
    );
}

export default ComponentTitle;