import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "../../AddTodoForm";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// Que onda soy un comentario

const initialTodos: Todo[] = [
  {
    text: "Add your first thing to do",
    complete: false,
  }
];

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "7em"
  }
}))

function List() {
  const [todos, setTodos] = useState(initialTodos);
  const [userid, setUserid] = useState('')
  const classes = useStyles()

  const user = useContext(AuthContext)

  const toggleComplete: ToggleComplete = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  };

  // try get the data from the user
  const getUserData = async () => {
    try {
      if(user){
        await setUserid(user.uid)
        await localStorage.setItem("uid", user.uid)
        localStorage.setItem("token", await user.getIdToken())
        const uri:string = `https://tests-3d7ec-default-rtdb.firebaseio.com/todo-list/${localStorage.getItem("uid")}.json?auth=${localStorage.getItem("token")}`
        fetch(uri)
        .then(res => {
          if(res.ok){
            console.log("response ok");
            return res.json()
          }
          throw res
        })
        .then((result) => {
          console.log("-- RESULTADOS DEL FETCH --\n",result,"\n-- LO QUE TENGO EN EL TODO--\n",todos)
          setTodos([...todos,result])
          console.log("\n-- NUEVO TODOS --\n",todos)
        }).catch(error => {
          console.error("Error obteniendo los datos: ", error)
        })
      }
      
      return
    } catch (e) {
      const error:Error = e
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Container className={classes.content} maxWidth="sm">
      <TodoList todos={todos} toggleComplete={toggleComplete} />
      <AddTodoForm addTodo={addTodo} />
    </Container>
  );
}

export default List;
