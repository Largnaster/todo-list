import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
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

  const addTodo: AddTodo = async (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
    try {
      const uri:string = await getLink()
      if(uri.length <=1){
        return
      }else{
        axios.put(uri, newTodo)
      }
    } catch (e) {
      console.log(e)
      throw e;
    }
  };

  const getLink = async () => {
    if(user){
      await setUserid(user.uid)
      localStorage.setItem("uid", user.uid)
      localStorage.setItem("token", await user.getIdToken())
      return `https://tests-3d7ec-default-rtdb.firebaseio.com/todo-list/${localStorage.getItem("uid")}.json?auth=${localStorage.getItem("token")}`
    }else{
      return ""
    }
  }

  // try get the data from the user
  const getUserData = async () => {
    try {
      const uri:string = await getLink()
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
      
      return
    } catch (e) {
      console.log(e)
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
