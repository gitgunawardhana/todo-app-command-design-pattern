import axios from "axios";

const completeTask = async (taskId) => {
  await axios
    .post(`http://localhost:8080/tasks/complete/${taskId}`)
    .then((response) => {
      console.log(response);
      // window.location.reload();
    })
    .catch((error) => console.log(error));
};

const deleteTask = async (taskId) => {
  await axios
    .post(`http://localhost:8080/tasks/delete/${taskId}`)
    .then((response) => {
      console.log(response);
      // window.location.reload();
    })
    .catch((error) => console.log(error));
};

const undo = async () => {
  await axios
    .post(`http://localhost:8080/tasks/undo`)
    .then((response) => {
      console.log(response);
      // window.location.reload();
    })
    .catch((error) => console.log(error));
};

const redo = async () => {
  await axios
    .post(`http://localhost:8080/tasks/redo`)
    .then((response) => {
      console.log(response);
      // window.location.reload();
    })
    .catch((error) => console.log(error));
};

export { completeTask, deleteTask, redo, undo };
