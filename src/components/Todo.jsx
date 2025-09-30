import React, { useState } from "react";
import "../index.css";
import "../App.css";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a todo item");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };



  const handleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div>
      <div className="flex justify-center items-center content-center h-screen  ">
        <div className="p-12 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <h1 className="text-4xl mb-2 antialiased font-bold font-stretch-condensed mt-2">
              My To-Do List
            </h1>
            <span className="block mb-2 mt-4 font-thin antialiased">
              Add a new task
            </span>
            <form>
              <input
                type="text"
                id="todo"
                className="border rounded-md border-transparent shadow-sm  w-full px-2 shadow-gray-300 py-1 mr-2 focus:outline-slate-400"
                placeholder="Enter your task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="block bg-blue-500 text-white px-3 py-1 rounded mt-4 cursor-pointer hover:bg-blue-400 transition"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </form>
          </div>

          <div id="tasks">
            <ul className="list-none p-0">
              {todos.length === 0 ? (
                <p className="text-red-500 text-center">
                  No tasks yet! Add one above.
                </p>
              ) : (
                <ul className="space-y-2">
                  {todos.map((todo) => (
                    <li className="flex items-center justify-between gap-4" key={todo.id}>
                      <div className="flex gap-2">
                        <button
                        type="button"
                        onClick={() => handleComplete(todo.id)}
                        className="p-0 bg-transparent border-0 cursor-pointer"
                        aria-pressed={todo.completed}
                        aria-label={
                          todo.completed ? `Mark ${todo.text} as incomplete` : `Mark ${todo.text} as complete`
                        }
                      >
                        {todo.completed ? (
                          <FaCircleCheck className="text-xl text-green-600" />
                        ) : (
                          <MdOutlineRadioButtonUnchecked className="text-xl" />
                        )}
                      </button>
                      <span className={todo.completed ? "line-through text-gray-400" : ""}>
                        {todo.text}
                      </span>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => handleDelete(todo.id)}
                          className="p-3 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 bg-red-300 cursor-pointer transition"
                          aria-label={`Delete ${todo.text}`}
                        >
                          <FaRegTrashAlt color="red" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
