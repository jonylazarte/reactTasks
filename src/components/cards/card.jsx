import {useState} from 'react'

export const Card = ({deleteCard, editTaskStatus, data:{title, date, description, status, priority, taskID, userID, teamID, userName}, data})=>{
   const [showMore, setShowMore] = useState(false)
   const limitString = str => {
		if (str.length > 170)return{string: str.slice(0,167).concat("..."), addButon:true}
		 return{string: str, addButon: false} }
	return 	<div className="card" key={taskID}>
						<h3>{title}</h3>
						<button onClick={() => editTaskStatus(data)} className={status.toLowerCase()}>{status}</button>
						<button onClick={() => deleteCard(taskID)}>X</button>
						<h5 >{userName}</h5><h6>{new Date(date).toLocaleString()}</h6>
						{!showMore && <p>{limitString(description).string}</p>}
						{!showMore && limitString(description).addButon &&(
                        	<button type="button"onClick={()=>setShowMore(true)}>Ver Mas</button>)}
                        {showMore && limitString(description).addButon &&(
                        	<><p>{description}</p>
                        	<button type="button" onClick={()=>setShowMore(false)}>Ver Menos</button></>
                        	)}
                        {showMore && !limitString(description).addButon &&(
                        	<><p>{description}</p></>
                        	)}

					</div>				
}
