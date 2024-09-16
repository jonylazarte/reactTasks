import react from 'react'
import {useParams} from 'react-router-dom'


export default function Registered(){
	const {teamID} = useParams()
	return <>
	el team ID es: {teamID}, so enjoy it
	</>
}