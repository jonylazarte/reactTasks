import react, {useState} from 'react'
import { useFormik } from 'formik';
import {useNavigate, Link} from 'react-router-dom'
import * as Yup from 'yup'
import Tasks from './Tasks.jsx'
import '../App.css'


export default function login(){
    const {VITE_API_URL : API_URL} = import.meta.env;
	const [email, setEmail] = useState();          
	const [contra, setContra] = useState();
	const navigate = useNavigate();
    const initialValues = {
        userName: "",
        password: ""
    }
    /*const validate = values =>{
        const errors = {};

        if (!values.email){
            errors.email = "El email es requerido"
        }if (!values.password){
            errors.password = "El passowrd es requerido"
        }
        return errors
    }*/
    const validationSchema = ()=>
        Yup.object().shape({
        userName: Yup.string().required(" Campo obligatorio"),
        password: Yup.string().required(" Campo obligatorio")
    })
    const onSubmit = (e) => {
        e.preventDefault; alert("done")
        fetch(`${API_URL}login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({

                    userName : values.userName,
                    password: values.password
                
            })
        }).then(response => response.json()).then((data) => {
            localStorage.setItem('teamID', data.teamID)
            localStorage.setItem('userID', data.userID)
            localStorage.setItem('userName', data.userName)
            navigate('/Tasks')
        })

    }   
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const {handleChange, handleSubmit, errors, handleBlur, touched, values, setFieldValue} = formik;

	/*const HandleSubmit = e =>{
        e.preventDefault();
       if(contra == undefined || email == undefined){    
        console.log("El usuario no coincide con la contraseña");
       } else if (contra === "Jonii1543104" && email === "jonii43104.2001@gmail.com"){
        alert("Inicio de Sesion completado");}
        navigate("/Tasks",{replace:true})
       }*/
       
       return <>
    <form onSubmit={handleSubmit}className="FormularioLogin">
    <h2>Iniciar Sesión</h2>
    	<label>Nombre de Usuario</label>
    	<input
    	 type="text"
    	 name="userName"
         onBlur={handleBlur}
    	 onChange={handleChange}></input>
         {errors.userName && touched.userName && <div>{errors.userName}</div>}
    	<label>Contraseña</label>
    	<input
    	 type="password"
    	 name="password"
         onBlur={handleBlur}
    	 onChange={handleChange}></input>
         {errors.password && touched.password && <div>{errors.password}</div>}
    	<button type="submit">Ingresar</button>
        <Link preload="true" to ="/Register">Registrarse</Link>
    </form>
    </>
}
