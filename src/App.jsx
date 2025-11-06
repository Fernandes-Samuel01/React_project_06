import { useState, useEffect } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos(prev => [{ id: Date.now(), ...todo }, ...prev]); //If we just give todo to setTodo then the previous todos will be lost, so we have to spread the previous todos using ...prev, we have to add our new todo with the previous todos. Here we are adding the new todo at the start of the array using [newTodo, ...prev], if we want to add it at the end then we can do [...prev, newTodo
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

    // //This is for understanding purpose only of the first line above
    // -    // prev.map((eachValue) => {        //in this step each todo in the memory is looped and checked for the edited todo id
    // -    //   if(eachValue.id === id){       //if the id matches then the edited todo is returned
    // -    //     return todo
    // -    //   } else {                       //if the id does not match then the existing todo is returned
    // -    //     return eachValue
    // -    //   }
    // -    // })
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))   //filter method creates a new array with all elements that pass the test implemented by the provided function. Here we are keeping all todos whose id does not match the id to be deleted. So filter() is used instead of map()
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>  //take ll the previous todos
      prev.map((prevTodo) =>  //loop through each todo, then it will get value of each todo
        prevTodo.id === id ? {  //if the id matches then return the todo with completed value toggled
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  // Our localstorage stores in srting format so when we want to get data from localstorage we have to parse it back to object format using JSON.parse() method
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // When we want to store data in localstorage we have to convert it to string format using JSON.stringify() method
  // Here we are using useEffect so that whenever there is a change in todos array this effect runs and updates the localstorage with the latest todos array (whenever i add a todo it gets added in the todos array and this effect runs and updates the localstorage with the latest todos array)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} // key is necessary when we are rendering a list of items in react (when using map()), it helps react to identify which items have changed, are added, or are removed
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App