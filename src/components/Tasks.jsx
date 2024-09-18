import {react, useState, useEffect} from 'react'
import debounce from 'lodash/debounce'
import Header from './Header.jsx'
import {Card} from './cards/card.jsx'
import TaskForm from './Taskform.jsx'
import '../Tasks.css'
import {useResize} from '../hooks/useResize.js'
import {useDispatch, useSelector} from 'react-redux'
import {getTasks, deleteTask, editTaskStatus} from '../store/actions/tasksActions'



export default function Tasks(){
	const {isPhone} = useResize();
	const [allTasks, setAllTasks] = useState([]);
	const [tasksFrom, setTasksFrom] = useState("Todas");
	const [searchValue, setSearchValue] = useState("");
	const [searchingTasks, setSearchingTasks] = useState([]);
	const [searching, setSearching] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const dispatch = useDispatch();
    const {loading, error, tasks} = useSelector(state=>{ return state.tasksReducer });
    var typeOfRender = searching? searchingTasks : tasks;
    const {VITE_API_URL : API_URL} = import.meta.env;

    // Llamar a la Api y setear las tareas totales y las tareas del usuario -----------------------------------------------------------------
    useEffect(()=>{
    	dispatch(getTasks(tasksFrom == "Todas" ? "tasks" : "userTasks" ))
    	fetch(`${API_URL}tasks`).then(response => response.json()).then(data => setAllTasks(data))   		
    },[tasksFrom])

    // Manejo del estado de tareas filtradas por el buscador- ------------------------------------------------------------------------------
    const handleSearch = debounce((event) => {
    	setSearchValue(event?.target?.value)
    }, 800)
    useEffect(()=>{ 	
    	if(searchValue == ""){setSearching(false)} else{setSearchingTasks(tasks.filter(task => task.title.toLowerCase().startsWith(searchValue))); setSearching(true) }	
    },[searchValue])

    const handleDispatch = () => dispatch(getTasks("tasks"))
    const handleDelete = id => dispatch(deleteTask(id))
    const handleEditStatus = data => dispatch(editTaskStatus(data))

	const renderTasks = (param)=>{return typeOfRender?.filter(task => task.status == param).map(task =>(
		<Card key={task.taskID} data={task} deleteCard={handleDelete} editTaskStatus={handleEditStatus} ></Card>
	))}
	const handlePriority = (e)=>{
		let value = e.target.value
		if(value == "Todas"){setSearching(false)}
		if(value !== "Todas" && tasksFrom == "Todas"){setSearching(true); setSearchingTasks(tasks.filter(task => task.priority == value))}
		if(value !== "Todas" && tasksFrom == "Mis Tareas"){setSearching(true); setSearchingTasks(tasks.filter(task => task.priority == value))} 
        
	}

	return <>
		<main id="main">
		    <TaskForm handleUpdate={handleDispatch}lastId={allTasks.length}>	    	
		    </TaskForm>

			<section className="wrapper_list">
				<div className="list_header">
				
				<select onChange={handlePriority}><option>Todas</option><option value="Low">Baja</option><option value="Medium">Media</option><option value="High">Alta</option></select>
				<select onChange={event => setTasksFrom(event.currentTarget.value)}><option>Todas</option><option>Mis Tareas</option></select>
				<input type="search" onChange={handleSearch}></input>
				</div>		
				
				{isPhone ? (
						console.log("isPhone")
						): (
				<div className="list_pc">
					<div className="status"><h2>Nuevas</h2>{renderTasks("New")}</div>
					<div className="status"><h2>En Proceso</h2>{renderTasks("InProcess")}</div>
					<div className="status"><h2>Terminadas</h2>{renderTasks("Finished")}</div>
				</div>
				)}
				
				
			</section>
		</main>
	</>
}
