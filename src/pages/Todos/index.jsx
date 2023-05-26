import ResponsiveDrawer from "@/components/sidbar";
import TimePicker from "@/components/timePicker";
import TodoList from "@/components/todoList";
import { Typography } from "@mui/material";

const Todos = () => {
   
    return (
        <>
       <TodoList/>
        </>
      );
}
 
Todos.getLayout = function getLayout(page) {
    return (
      <ResponsiveDrawer>
        {page}
      </ResponsiveDrawer>
    )
  }
export default Todos;