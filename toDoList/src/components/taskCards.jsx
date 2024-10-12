import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import './taskCard.css';

function TaskCards(props) {

    //handles logic for when the delete button is pressed
    const delButton = (event) => {
        event.preventDefault();
        props.handleDel({id: props.id, task: props.name, date: props.date, priority: props.priority})
    }

    //handles logic for when the done button is pressed
    const doneButton =(e)=> {
        e.preventDefault();
        props.handleDone({id: props.id, task: props.name, date: props.date, priority: props.priority});
    }

    return(
        <>
            <Card className="task-card">
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Nivel de Prioridad: {props.priority}</Card.Subtitle>
                    <Card.Footer>Fecha de Vencimiento: {props.date}</Card.Footer>
                    <div className="button-group">
                        <button onClick={delButton} className="task-btn delete-btn">Borrar</button>
                        <button onClick={doneButton} className="task-btn done-btn">He Hecho</button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )

}

export default TaskCards;