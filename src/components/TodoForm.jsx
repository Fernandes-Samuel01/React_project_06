import React from "react";
import { useTodo } from "../context";

function TodoForm() {
    const [todo, setTodo] = React.useState("");
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault();

        if (!todo) return 

        addTodo({ todo, completed: false }); //the todo method just takes an todo as argument but in its functionality there are previous todo spreading, then new todo is given an id and then remaining values are spread out, so we pass the todo object here with todo and completed values

        setTodo("") //to clear the input field after adding the todo
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} //in input field we always have to set the value and onChange handler to update the value
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

