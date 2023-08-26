import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type Item = {
  id: number;
  desc: string;
  type: "Todo" | "Doing" | "Done";
};

type TodoListContextType = {
  todoListData: Item[];
  draggedItem: any;
  setDraggedItem: (item: Item) => void;
  addList: (item: Item) => void;
  removeList: (item: Item) => void;
  editListItem: (item: Item) => void;
};

export const TodoListContext = createContext<TodoListContextType>({
  todoListData: [],
  draggedItem: undefined,
  setDraggedItem: () => {},
  addList: () => {},
  removeList: () => {},
  editListItem: () => {},
});

const TodoListContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todoListData, setTodoListData] = useState<Item[]>([]);
  const [draggedItem, setDraggedItem] = useState<any>(undefined);

  useEffect(() => {
    const localData =
      !!localStorage.getItem("todoListData") &&
      localStorage.getItem("todoListData") !== null
        ? JSON.parse(localStorage.getItem("todoListData") as string)
        : [];

    setTodoListData(localData.filter((el: Item) => el.desc.length > 0));
    localStorage.setItem(
      "todoListData",
      JSON.stringify(localData.filter((el: Item) => el.desc.length > 0))
    );
  }, [localStorage]);

  const addList = (item: Item) => {
    setTodoListData((prev) => [...prev, item]);
    localStorage.setItem("todoListData", JSON.stringify(todoListData));
  };

  const removeList = (item: Item) => {
    const newList = [...todoListData.filter((el: Item) => el.id !== item.id)];
    setTodoListData(newList);
    localStorage.setItem("todoListData", JSON.stringify(newList));
  };

  const editListItem = (item: Item) => {
    if (
      !todoListData.some(
        (el: Item) => el.desc === item.desc && el.type === item.type
      )
    ) {
      const editedList = [
        ...todoListData.filter((el: Item) => el.id !== item.id),
        item,
      ];
      setTodoListData(editedList);

      localStorage.setItem("todoListData", JSON.stringify(editedList));
    } else {
      alert("item is exist");
    }
  };
  return (
    <TodoListContext.Provider
      value={{
        todoListData,
        draggedItem,
        setDraggedItem,
        addList,
        removeList,
        editListItem,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  return useContext(TodoListContext);
};

export default TodoListContextProvider;
