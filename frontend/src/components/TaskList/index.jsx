import Task from "../Task";

function TaskList(props) {
  return (
    <div>
      {props.todoList.map((todo) => (
        <Task todo={todo} />
      ))}
    </div>
  );
}
export default TaskList;
