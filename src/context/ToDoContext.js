import { createContext, useContext } from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,  //here id is given to these todos for editing and deleting purpose only, if only adding todo  was there then there was no need of id, but here since we have to edit and delete also so id is necessary
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider