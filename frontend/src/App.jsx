import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import TaskList from "./components/TaskList";
import { ProviderContext } from "./components/provider";
import { redo, undo } from "./services/api";

function App() {
  const { refreshHandle, setRefreshHandle, todoList, setTodoList } =
    useContext(ProviderContext);

  const [todoDescription, setTodoDescription] = useState("");

  const [idCount, setIdCount] = useState(todoList.length + 1);

  const addTodo = async () => {
    if (todoDescription.length > 0) {
      const newTodo = {
        id: idCount,
        description: todoDescription,
        completed: "false",
      };
      await axios
        .post("http://localhost:8080/tasks/add", newTodo)
        .then(function (response) {
          console.log(response);
          setIdCount(idCount + 1);
          setRefreshHandle(refreshHandle + 1);
          setTodoDescription("");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Type Todo here...");
    }
  };

  const getAllTodos = async () => {
    await axios
      .get("http://localhost:8080/tasks")
      .then(function (response) {
        setTodoList(response.data.reverse());
        setIdCount(response.data.length + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTodos();
  }, [{ refreshHandle }]);

  return (
    <div className="bg-[#080827] min-h-screen font-normal text-sm pb-2">
      <div className="bg-[#1D1D36] justify-between content-center flex py-5 px-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Todo-List</h1>
        </div>
      </div>

      <div className="container mx-auto mt-10 sticky top-3 z-10 bg-[#080827]">
        <div className="flex flex-wrap bg-[#1D1D36] justify-between content-center py-5 px-5 my-2 mx-3 rounded-lg gap-2">
          <div className="my-auto grow">
            <label
              htmlFor="todo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Todo
            </label>
            <input
              type="text"
              name="todo"
              id="todo"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
          </div>
          <div className="my-auto">
            <div className="h-7"></div>
            <button
              className="capitalize bg-green-400 hover:bg-green-500 px-5 rounded-full py-2 hover:font-medium"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        </div>
        {undoRedoTask(setRefreshHandle, refreshHandle)}
      </div>

      <div className="container mx-auto">
        <TaskList todoList={todoList} />
      </div>
    </div>
  );
}

export default App;

function undoRedoTask(setRefreshHandle, refreshHandle) {
  return (
    <div className="flex justify-between px-4 mt-10 pb-8">
      <div className="my-auto">
        <h1 className="text-4xl font-black text-orange-400">Your Todos:</h1>
      </div>
      <div className="my-auto flex gap-3 text-white">
        <button
          className=""
          title="undo"
          onClick={() => {
            undo();
            setRefreshHandle(refreshHandle + 1);
          }}
        >
          <FaUndoAlt />
        </button>
        <button
          className=""
          title="redo"
          onClick={() => {
            redo();
            setRefreshHandle(refreshHandle + 1);
          }}
        >
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
}
