import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE} from '../types'
export const tasksRequest = ()=>({
	type: TASKS_REQUEST,
})
export const tasksSuccess = data=>({
	type: TASKS_SUCCESS,
	payload: data,
})
export const tasksFailure = error=>({
	type: TASKS_FAILURE,
	payload: error,
})
const {VITE_API_URL : API_URL} = import.meta.env;
export const getTasks = (path) => dispatch =>{
	dispatch(tasksRequest())
	fetch(`${API_URL}${path}`,{
		headers: {'Content-Type': 'application/json', Autorization: localStorage.getItem("userID")}
	}).then(response => response.json())
	.then(data =>dispatch(tasksSuccess(data)))
	.catch(error =>dispatch(tasksFailure(error)))
}
export const deleteTask = id => dispatch =>{
	dispatch(tasksRequest())
	fetch(`${API_URL}tasks/${id}`,{
		method: "DELETE",
		headers: {'Content-Type': 'application/json', Autorization: localStorage.getItem("userID")}
	}).then(response => response.json())
	.then(() => dispatch(getTasks("tasks")))
	.catch(error =>dispatch(tasksFailure(error)))
}
export const editTaskStatus = data => dispatch =>{
	const statusArray = ["New", "InProcess", "Finished"]
	const newStatusIndex = statusArray.indexOf(data.status) > 1 ? 0 : statusArray.indexOf(data.status) + 1
	dispatch(tasksRequest())
	fetch(`${API_URL}tasks/${data.taskID}`,{
		method: "PATCH",
		headers: {'Content-Type': 'application/json', Autorization: localStorage.getItem("userID")},
		body: JSON.stringify({
			        title : data.title,
                    taskID : data.taskID,
                    priority: data.priority,
                    status: statusArray[newStatusIndex],
                    description: data.description,
                    date: Date.now(),
                    userID: localStorage.getItem('userID'),
                    userName: localStorage.getItem('userName'),  
                    teamID: localStorage.getItem('teamID')
		})
	}).then(response => response.json())
	.then(() => dispatch(getTasks("tasks")))
	.catch(error =>dispatch(tasksFailure(error)))
}
