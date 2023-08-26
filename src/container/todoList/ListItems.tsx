import { useState } from "react";

import { Item, useTodoListContext } from "@provider/TodoListContextProvider";
import { UtilsHelper } from "@utils/UtilsHelper";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PlusIcon from "@assets/icons/PlusIcon";
import { colorPalette } from "@uiKits/colors/Color";
import { Draggable, Droppable } from "react-beautiful-dnd";

type ListItem = {
  type: "Todo" | "Doing" | "Done";
  title: string;
  data: any[];
};
const ListItems = ({ title, type, data }: ListItem) => {
  const [value, setValue] = useState<string | string[]>("");

  const { addList, removeList, editListItem, todoListData, setDraggedItem } =
    useTodoListContext();

  const editItem = (e: any, item: Item) => {
    if (e.key === "Enter") {
      console.log({ value });
      if (Array.isArray(value)) {
        handlePast(item);
      } else {
        editListItem({ id: item.id, desc: value, type: item.type });
      }
    }
  };

  const handlePast = (item: Item) => {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((el: string, idx: number) => {
        if (idx === 0) {
          editListItem({ id: item.id, desc: el, type: item.type });
        } else {
          addList({ id: todoListData.length + 1, desc: el, type });
        }
      });
    }
  };
  const chechedItem = (checked: boolean, el: Item) => {
    if (checked) {
      setTimeout(() => {
        switch (el.type) {
          case UtilsHelper.ListType[0].name:
            console.log(checked, el.type, "111");
            editListItem({ id: el.id, desc: el.desc, type: "Doing" });
            break;
          case UtilsHelper.ListType[1].name:
            console.log(checked, el.type, "222");
            editListItem({ id: el.id, desc: el.desc, type: "Done" });
            break;
          default:
            break;
        }
      }, 1000);
    } else {
      console.log(checked, el.type);
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
      }, 1000);
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
                    <>
                      <Draggable
                        key={el.id}
                        draggableId={`${el.id}`}
                        index={idx}
                      >
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
                                  height: "48px",
                                  gap: "10px",
                                  border: `1px solid ${
                                    UtilsHelper.renderItemColors(type)
                                      .borderColor
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
                                  defaultValue={el.desc}
                                  onChange={(e) => setValue(e.target.value)}
                                  onPaste={(e) => {
                                    console.log(
                                      e.clipboardData
                                        .getData("text/Plain")
                                        .split("\n")
                                    );
                                  }}
                                  onKeyDown={(e) => editItem(e, el)}
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
                                    UtilsHelper.renderItemColors(type)
                                      .borderColor
                                  }`}
                                />
                              )}
                            </>
                          );
                        }}
                      </Draggable>
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
                    </>
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
            </Stack>
          )}
        </Droppable>
        {type !== UtilsHelper.ListType[2].name && (
          <Stack
            onClick={() =>
              addList({ id: todoListData.length + 1, desc: "", type })
            }
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
