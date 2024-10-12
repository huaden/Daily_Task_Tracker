import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import './doneTask.css'

function DoneTaskCard(props) {
    const curDate = new Date();

    const year = props.date.substr(0, 4);
    const month = parseInt(props.date.substr(5, 2)) - 1;
    const day = props.date.substr(8, 2);

    const dueDate = new Date(year, month, day);

    const onTime = dueDate > curDate
    //section above determines if the completed task is on time or not


    //returns the cards with done tasks 
    //styled green for on time
    //styled red for late
    return(<>
            <Card className="done-task-card">
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>{onTime ? <span className="on-time">A tiempo</span> : <span className="late">Tarde</span>} </Card.Text>
                </Card.Body>
            </Card>
        </>)
}

export default DoneTaskCard;