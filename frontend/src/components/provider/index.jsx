import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProviderContext = createContext();

const Provider = (props) => {
  const [refreshHandle, setRefreshHandle] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [idCount, setIdCount] = useState(0);
  const [todoDescription, setTodoDescription] = useState("");

  const addTask = async () => {
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
          setRefreshHandle(!refreshHandle);
          setTodoDescription("");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Type Todo here...");
    }
  };

  const getAllTask = async () => {
    await axios
      .get("http://localhost:8080/tasks")
      .then(function (response) {
        setTodoList(response.data.reverse());

        if (todoList.length === 0 && idCount === 0) {
          setIdCount(1);
        } else {
          setIdCount(response.data[0].id + 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const completeTask = async (taskId) => {
    await axios
      .post(`http://localhost:8080/tasks/complete/${taskId}`)
      .then((response) => {
        console.log(response);
        setRefreshHandle(!refreshHandle);
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const deleteTask = async (taskId) => {
    await axios
      .post(`http://localhost:8080/tasks/delete/${taskId}`)
      .then((response) => {
        console.log(response);
        setRefreshHandle(!refreshHandle);
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const undo = async () => {
    await axios
      .post(`http://localhost:8080/tasks/undo`)
      .then((response) => {
        console.log(response);
        setRefreshHandle(!refreshHandle);
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const redo = async () => {
    await axios
      .post(`http://localhost:8080/tasks/redo`)
      .then((response) => {
        console.log(response);
        setRefreshHandle(!refreshHandle);
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTask();
  }, [refreshHandle]);

  return (
    <ProviderContext.Provider
      value={{
        refreshHandle,
        setRefreshHandle,
        todoList,
        setTodoList,
        idCount,
        setIdCount,
        addTask,
        getAllTask,
        completeTask,
        deleteTask,
        undo,
        redo,
        todoDescription,
        setTodoDescription,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
