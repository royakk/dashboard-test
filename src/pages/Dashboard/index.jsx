import { useEffect,useState } from "react";
import ResponsiveDrawer from "@/components/sidbar";
import TimePicker from "@/components/timePicker";
import { Stack, Typography } from "@mui/material";


const Dashboard = () => {
    const[user,setUser ] =useState('')

    useEffect(()=> {
      if (typeof window !== "undefined" && window.localStorage) {
       const name= localStorage.getItem("user")
       setUser(name)
      }
    })
     
    console.log("useeer",user);
    return (
        <>
        <Stack spacing={2}>
        <TimePicker/>
        <Typography  my={4} variant="h4">Good morning {user}</Typography>
        </Stack>
        </>
      );
}
 
Dashboard.getLayout = function getLayout(page) {
    return (
      <ResponsiveDrawer>
        {page}
      </ResponsiveDrawer>
    )
  }
export default Dashboard;