import { createContext, useState } from "react";

export const ProviderContext = createContext();

const Provider = (props) => {
  const [refreshHandle, setRefreshHandle] = useState(0);
  const [todoList, setTodoList] = useState([]);
  return (
    <ProviderContext.Provider
      value={{ refreshHandle, setRefreshHandle, todoList, setTodoList }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
