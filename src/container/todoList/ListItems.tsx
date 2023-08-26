import { useState } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { Item, useTodoListContext } from "@provider/TodoListContextProvider";
import { UtilsHelper } from "@utils/UtilsHelper";
import { colorPalette } from "@uiKits/colors/Color";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PlusIcon from "@assets/icons/PlusIcon";


type ListItem = {
  type: "Todo" | "Doing" | "Done";
  title: string;
  data: any[];
};
const ListItems = ({ title, type, data }: ListItem) => {

  const { addList, removeList, editListItem, todoListData, setDraggedItem } =
    useTodoListContext();

  const handlePaste = (value: string[], item: Item) => {
    const newItems: Item[] = [];
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((el: string, idx: number) => {
        if (!!el && el.length > 0) {
          if (idx === 0) {
            editListItem({ id: item.id, desc: el, type: item.type });
          } else {
            newItems.push({ id: todoListData.length + idx, desc: el, type });
          }
        }
      });
      addList(newItems);
    }
  };
  const chechedItem = (checked: boolean, el: Item) => {
    if (checked) {
      setTimeout(() => {
        switch (el.type) {
          case UtilsHelper.ListType[0].name:
            editListItem({ id: el.id, desc: el.desc, type: "Doing" });
            break;
          case UtilsHelper.ListType[1].name:
            editListItem({ id: el.id, desc: el.desc, type: "Done" });
            break;
          default:
            break;
        }
      }, 3000);
    } else {
      setTimeout(() => {
        switch (el.type) {
          case UtilsHelper.ListType[1].name:
            editListItem({ id: el.id, desc: el.desc, type: "Todo" });
            break;
          case UtilsHelper.ListType[2].name:
            editListItem({ id: el.id, desc: el.desc, type: "Doing" });
            break;
          default:
            break;
        }
      }, 3000);
    }
  };

  return (
    <div id={type}>
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          backgroundColor: UtilsHelper.renderItemColors(type).bgColor,
          borderRadius: "10px",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between" mb="20px">
          <Typography
            fontSize="15px"
            fontWeight="600"
            color={UtilsHelper.renderItemColors(type).titleColor}
          >
            {title}
          </Typography>
          <Typography
            fontSize="12px"
            fontWeight="500"
            color={UtilsHelper.renderItemColors(type).textColor}
          >
            {data.length ?? 0} Tasks
          </Typography>
        </Stack>
        <Droppable droppableId={type}>
          {(provided, snapshot) => (
            <Stack
              gap="12px"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.length > 0 ? (
                data.map((el: Item, idx) => {
                  return (
                    <Draggable key={el.id} draggableId={`${el.id}`} index={idx}>
                      {(provided, dropSnapshot) => {
                        if (dropSnapshot.isDragging) {
                          setDraggedItem(el);
                        }

                        return (
                          <>
                            <Paper
                              elevation={0}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "12px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                minHeight: "48px",
                                gap: "10px",
                                border: `1px solid ${
                                  UtilsHelper.renderItemColors(type).borderColor
                                }`,
                                boxShadow: dropSnapshot.isDragging
                                  ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                                  : "unset",
                                outlineColor: dropSnapshot.isDragging
                                  ? "card-border"
                                  : "transparent",
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {!!el.desc && (
                                <input
                                  type="checkbox"
                                  defaultChecked={
                                    el.type === UtilsHelper.ListType[2].name
                                  }
                                  onChange={(e) =>
                                    chechedItem(e.target.checked, el)
                                  }
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    border: `1px solid ${
                                      UtilsHelper.renderItemColors(type)
                                        .borderColor
                                    }`,
                                  }}
                                />
                              )}
                              <InputBase
                                multiline
                                defaultValue={el.desc}
                                onChange={(e) =>
                                  editListItem({
                                    id: el.id,
                                    desc: e.target.value,
                                    type: el.type,
                                  })
                                }
                                onPaste={(e) => {
                                  e.preventDefault();
                                  handlePaste(
                                    e.clipboardData
                                      .getData("text/Plain")
                                      .split(/\r\n|\r|\n/g)
                                      .filter(
                                        (line: string) => line.length > 0
                                      ),
                                    el
                                  );
                                }}
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: colorPalette.black50,
                                  flex: 1,
                                  p: 0,
                                  height: "100%",
                                  textDecoration:
                                    el.type === UtilsHelper.ListType[2].name
                                      ? "line-through"
                                      : "",
                                }}
                              />
                              <Stack
                                onClick={() => removeList(el)}
                                sx={{
                                  transform: "rotate(45deg)",
                                  cursor: "pointer",
                                  opacity: 0,
                                  ":hover": {
                                    opacity: 1,
                                  },
                                }}
                              >
                                <PlusIcon
                                  fill={
                                    UtilsHelper.renderItemColors(type)
                                      .newTextColor
                                  }
                                />
                              </Stack>
                            </Paper>
                            {dropSnapshot.isDragging && (
                              <Stack
                                width="100%"
                                height="48px"
                                bgcolor={colorPalette.white}
                                border={`1px dashed ${
                                  UtilsHelper.renderItemColors(type).borderColor
                                }`}
                              />
                            )}
                          </>
                        );
                      }}
                    </Draggable>
                  );
                })
              ) : (
                <Typography
                  fontSize="12px"
                  fontWeight="500"
                  color={UtilsHelper.renderItemColors(type).textColor}
                  textAlign="center"
                >
                  List is Empty
                </Typography>
              )}
              {snapshot.isDraggingOver && (
                <Stack
                  width="100%"
                  height="48px"
                  bgcolor={colorPalette.white}
                  border={`1px dashed ${
                    UtilsHelper.renderItemColors(type).borderColor
                  }`}
                />
              )}
            </Stack>
          )}
        </Droppable>
        {type !== UtilsHelper.ListType[2].name && (
          <Stack
            onClick={() =>
              addList({ id: todoListData.length + 1, desc: "", type })
            }
            width="fit-content"
            flexDirection="row"
            alignItems="center"
            gap="10px"
            mt="23px"
            sx={{ cursor: "pointer" }}
          >
            <PlusIcon fill={UtilsHelper.renderItemColors(type).newTextColor} />
            <Typography
              fontSize="13px"
              fontWeight="600"
              color={UtilsHelper.renderItemColors(type).newTextColor}
            >
              New
            </Typography>
          </Stack>
        )}
      </Paper>
    </div>
  );
};

export default ListItems;
