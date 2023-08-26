import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

export type Item = {
  id: number;
  desc: string;
  type: "Todo" | "Doing" | "Done";
};

type TodoListContextType = {
  todoListData: Item[];
  draggedItem: any;
  setDraggedItem: (item: Item) => void;
  addList: (item: Item | Item[]) => void;
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

  const addList = (item: Item | Item[]) => {

    const newList = Array.isArray(item)
      ? [...todoListData, ...item]
      : [...todoListData, item];

    setTodoListData([...newList]);
    localStorage.setItem("todoListData", JSON.stringify(newList));
  };

  const removeList = (item: Item) => {
    const newList = [
      ...todoListData.filter((el: Item) => el.id !== item.id),
    ].map((el: Item, index: number) => ({ ...el, id: index + 1 }));
    setTodoListData(newList);
    localStorage.setItem("todoListData", JSON.stringify(newList));
    toast.success("Removed successfully!");
  };

  const editListItem = (item: Item) => {
    const editedList = todoListData;
    const itemIndex = editedList.findIndex((el: Item) => el.id === item.id);
    editedList[itemIndex].desc = item.desc;
    editedList[itemIndex].type = item.type;

    setTodoListData([...editedList]);

    localStorage.setItem("todoListData", JSON.stringify(editedList));
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
