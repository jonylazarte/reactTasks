import {useEffect, useState} from 'react'


export const useResize = () =>{
	const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true : false); 

	const HandleResize = () => {
		if(900 > window.innerWidth){ setIsPhone(true)}else{setIsPhone(false);}
	}
	const addButon = false;

	useEffect(()=>{
		HandleResize();
		window.addEventListener("resize", HandleResize);
		return () => window.removeEventListener('resize', HandleResize);
	})
	return {isPhone}
}