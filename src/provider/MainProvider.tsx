"use client";
import TodoListContextProvider from "./TodoListContextProvider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoListContextProvider>{children}</TodoListContextProvider>;
}
