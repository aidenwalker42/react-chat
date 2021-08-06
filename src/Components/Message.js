import React from 'react'

export default function Message(props) {
    return (
        <div>
            <div className="single-message">
                <h3>
                {props.name}
                </h3>
                <p>{props.message}</p>
            </div>
        </div>
    )
}
