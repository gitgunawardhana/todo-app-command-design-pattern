import Task from "../Task";

function TaskList(props) {
  return (
    <div>
      {props.todoList.map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
export default TaskList;
