import React from "react";

const CommonComponent = (props) => {
    const {name, number } = props;
    return(
        <div className={`child ${name}`}>
            <h1>Component {number}</h1>
            <h2>Hello Component {number}</h2>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>
    )
}

export default CommonComponent;