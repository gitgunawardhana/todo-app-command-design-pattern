import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { completeTask, deleteTask } from "../../services/api";
import { ProviderContext } from "../provider";

function Task(props) {
  const { refreshHandle, setRefreshHandle } = useContext(ProviderContext);
  return (
    <div
      className={twMerge([
        "flex flex-wrap bg-[#1D1D36] justify-between content-center py-5 px-5 my-2 mx-3 rounded-lg hover:bg-[#1D1D36] border border-[#1D1D36] hover:border hover:border-slate-300 hover:cursor-pointer",
        props.todo.completed && "disabled opacity-25",
      ])}
    >
      <div className="my-auto text-gray-400 mb-2">
        <p
          className={twMerge("font-medium", [
            props.todo.completed && "line-through font-normal",
          ])}
        >
          {props.todo.description}
        </p>
      </div>
      <div className="flex my-auto gap-2">
        <button
          className={twMerge([
            "capitalize bg-green-400 hover:bg-green-500 px-5 rounded-full py-2 hover:font-medium",
            props.todo.completed && "disabled opacity-25 cursor-not-allowed",
          ])}
          onClick={() => {
            completeTask(props.todo.id);
            setRefreshHandle(refreshHandle + 1);
          }}
        >
          complete
        </button>
        <button
          className="capitalize bg-orange-400 hover:bg-orange-500 px-5 rounded-full py-2 hover:font-medium"
          onClick={() => {
            deleteTask(props.todo.id);
            setRefreshHandle(refreshHandle + 1);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default Task;
