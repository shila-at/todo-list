import React from "react";

import { colorPalette } from "@uiKits/colors/Color";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItems from "./ListItems";
import { Item, useTodoListContext } from "@provider/TodoListContextProvider";
import { DragDropContext } from "react-beautiful-dnd";

const TodoList = () => {
  const { todoListData, draggedItem, editListItem } = useTodoListContext();

  const onDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    editListItem({ ...draggedItem, type: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box p="70px 120px" bgcolor="white">
        <Typography
          fontSize="34px"
          fontWeight="700"
          color={colorPalette.black50}
          mb="15px"
        >
          ✔️ Task List
        </Typography>
        <Typography
          fontSize="16px"
          fontWeight="500"
          color={colorPalette.black50}
          mb="45px"
          maxWidth="768px"
          lineHeight="30px"
        >
          Break your life to simple tasks to get things done! Does not matter
          how many tasks you done, It’s important to break to small tasks and be
          on progress.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListItems
              title="Todo"
              type="Todo"
              data={todoListData.filter((el: Item) => el.type === "Todo")}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItems
              title="Doing 💪"
              type="Doing"
              data={todoListData.filter((el: Item) => el.type === "Doing")}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItems
              title="Done 🎉"
              type="Done"
              data={todoListData.filter((el: Item) => el.type === "Done")}
            />
          </Grid>
        </Grid>
      </Box>
    </DragDropContext>
  );
};

export default TodoList;
