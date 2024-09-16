import react, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import '../TaskForm.css'

export default function Taskform({lastId, handleUpdate}){
	const {VITE_API_URL : API_URL} = import.meta.env;
    const [prioridad, setPrioridad] = useState();
    const [estado, setEstado] = useState();
    const initialValues = {
    	"title": "",
    	"priority" : "",
    	"status": "",
    	"description": ""
    }
    const onSubmit = (e)=>{
    	e.preventDefault;
    	fetch(`${API_URL}tasks`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json", Autorization: localStorage.getItem("userID")
            },
            body: JSON.stringify({
                    title : values.title,
                    taskID : lastId,
                    priority: values.priority,
                    status: values.status,
                    description: values.description,
                    date: Date.now(),
                    userID: localStorage.getItem('userID'),
                    userName: localStorage.getItem('userName'),  
                    teamID: localStorage.getItem('teamID')
            })
        }).then(response => response.json()).then(data => handleUpdate())
}
    const validationSchema = ()=>
    	Yup.object().shape({
    	title: Yup.string().min(6, " la cantidad minima de caracteres es 6").required(" Campo obligatorio"),
    	priority: Yup.string().required(" Campo obligatorio"),
    	status: Yup.string().required(" Campo obligatorio"),
    	description: Yup.string().required(" Campo obligatorio"),
    })
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const {handleChange, handleSubmit, errors, touched, handleBlur, values, resetForm} = formik;

	return <section className="taskform">
	<h2>Crea tus tareas</h2>
	<form onSubmit={handleSubmit}>
	 <div><input type="text" name="title" onChange={handleChange} onBlur={handleBlur} className={errors.title && touched.title ? "error" : ""} placeholder="Titulo"></input>{errors.title && touched.title && <span>{errors.title}</span>}</div>
	 <div><select name="status" onChange={handleChange} onBlur={handleBlur} className={errors.status && touched.status ? "error" : ""}>
	         <option name="none">Seleccionar</option>
	         <option name="New" value="New">Nueva</option>
	         <option name="InProcess" value="InProcess">En Proceso</option>
	         <option name="Finished" value="Finished">Terminada</option>
	     </select>  {errors.status && touched.status && <span>{errors.status}</span>}
	 </div>
	 <div><select name="priority" onChange={handleChange} onBlur={handleBlur} className={errors.priority && touched.priority ? "error" : ""}>
	         <option name="none">Seleccionar</option>
	         <option name="Low" value="Low">Baja</option>
	         <option name="Medium" value="Medium">Media</option>
	         <option name="High" value="High">Alta</option>
	     </select> {errors.priority && touched.priority && <span>{errors.priority}</span>} 
	 </div>
	 <div><input type="text" name="description" onChange={handleChange} onBlur={handleBlur} className={errors.description && touched.description ? "error" : ""} placeholder="Descripción"></input>{errors.description && touched.description && <span>{errors.description}</span>}</div>
	 <button type="submit">Create</button>
    </form>
 </section>
}