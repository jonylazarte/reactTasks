import react from 'react'
import "../App.css"
import {useSelector} from 'react-redux'


export default function Header(){
	const {tasks} = useSelector(state => {return state.	tasksReducer})
	return <div className="Header">
		<div>Tareas Creadas: {tasks.length}</div>
	</div>
}