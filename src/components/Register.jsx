import react, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {Switch, FormControlLabel} from '@mui/material'
import * as Yup from 'yup'
import Tasks from './Tasks.jsx'
import '../Register.css'


export default function Register(){
    const {VITE_API_URL : API_URL} = import.meta.env;
	const [email, setEmail] = useState();          
	const [contra, setContra] = useState();
    const [data, setData] = useState();
	const navigate = useNavigate();
    const initialValues = {
    	userName: "",
        email: "",
        password: "",
        teamId: "",
    	role: "",
    	continent: "",
    	region: "",
        switch: "false"

    }
    useEffect(()=>{
        fetch('./src/data.json').then(res => res.json()).then(res =>setData(res.result))
    }, [])
    /*const validate = values =>{
        const errors = {};
        if (!values.email){
            errors.email = "El email es requerido"
        }if (!values.password){
            errors.password = "El password es requerido"
        }
        return errors
    }*/
    const onSubmit = (e) => {
        e.preventDefault; alert("done")
        const teamID = !values.teamId? uuidv4() : values.teamId
        const uaerID = uuidv4()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({
  "userName": values.userName,
  "password": values.password,
  "email": values.email,
  teamID,
  "userID" : uuidv4(),
  "role": values.role,
  "continent": values.continent,
  "region": values.region
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: body,
  redirect: "follow"
};

fetch(`${API_URL}register`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

    }
    const validationSchema = ()=>
    	Yup.object().shape({
    	userName: Yup.string().min(6, " la cantidad minima de caracteres es 6").required(" Campo obligatorio"),
    	email: Yup.string().required(" Campo obligatorio"),
    	password: Yup.string().required(" Campo obligatorio"),
    	role: Yup.string().required(" Campo obligatorio"),
    	continent: Yup.string().required(" Campo obligatorio"),
    	region: Yup.string().required(" Campo obligatorio"),
    })
    const handleContinent = value => {
        setFieldValue("continent", value);
        if(value !== "america"){setFieldValue("region", "Otro");}
    }
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const {handleChange, handleSubmit, errors, handleBlur, touched, values, setFieldValue} = formik;
	
       return <>
    <form onSubmit={handleSubmit}className="FormularioLogin">
    <h2>Registro</h2>
    	<div><label>Nombre de Usuario</label>
    	<input
    	 type="text"
    	 name="userName"
    	 onBlur={handleBlur}
    	 onChange={handleChange}>
         </input></div>
         {errors.userName && touched.userName && <div>{errors.userName}</div>}
        <div><label>Email</label>
    	<input
    	 type="email"
    	 name="email"
    	 onChange={handleChange}
    	 onBlur={handleBlur}>
         </input></div>
         {errors.email && touched.email && <div>{errors.email}</div>}
    	<div><label>Contraseña</label>
    	<input
    	 type="password"
    	 name="password"
    	 onBlur={handleBlur}
    	 onChange={handleChange}></input></div>
         {errors.password && touched.password && <div>{errors.password}</div>}
         <div><FormControlLabel
         control={
             <Switch
             value={values.switch}
             onChange={()=>formik.setFieldValue("switch", !formik.values.switch)}
             name="switch"
             color="secondary"/>
         }
         label="Pertenezco a un equipo ya creado"
         /></div>

    	{!values.switch && (<div><label>Team Id</label>
        <input
    	 type="text"
    	 name="teamId"
    	 onChange={handleChange}
         value={values.teamId}>
         </input></div>)}

        <div><label>Rol del team</label>
    	<select name="role" onChange={handleChange} onBlur={handleBlur}>
    	<option>Seleccionar rol</option>{data?.rol?.map(option => <option key={option} value={option}>{option}</option>)}
         </select></div>
         {errors.role && touched.role && <div>{errors.role}</div>}

        <div><label>Continente</label>
    	<select name="continent" onChange={e => handleContinent(e.currentTarget.value)} onBlur={handleBlur}>
    	<option>Seleccionar continente</option>{data?.continente?.map(option => <option key={option} value={option}>{option}</option>)}
         </select></div>
         {errors.continent && touched.continent && <div>{errors.continent}</div>}

        {values.continent === "America" && <div><label>Región</label>
        <select name="region" onChange={handleChange} onBlur={handleBlur}>
        <option>Seleccionar región</option>{data?.region?.map(option => <option key={option} value={option}>{option}</option>)}
         </select></div>}
         {errors.region && touched.region && <div>{errors.region}</div>}

    	<button type="submit">Ingresar</button>
    </form>
    </>
}