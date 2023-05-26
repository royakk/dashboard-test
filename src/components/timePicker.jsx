import React from "react";

const TimePicker = () => {
    const [time , setTime] = React.useState (new Date())
    React.useEffect(()=>{
        setInterval(()=> setTime(new Date()),60000)
    },[])
    const showTime= time.toLocaleTimeString();
    return ( <>
        <p className='text-slate-800 text-4xl'>{showTime}</p>
    </> );
}
 
export default TimePicker;