import { useState } from "react";

import { Item, useTodoListContext } from "@provider/TodoListContextProvider";
import { UtilsHelper } from "@utils/UtilsHelper";
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
  const [value, setValue] = useState<string>("");

  const { addList, removeList, editListItem, todoListData } =
    useTodoListContext();

  const editItem = (e: any, item: Item) => {
    if (e.key === "Enter") {
      editListItem({ id: item.id, desc: value, type: item.type });
    }
  };
  return (
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
      <Stack gap="12px">
        {data.length > 0 ? (
          data.map((el: Item) => {
            return (
              <Paper
                key={el.id}
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
                    UtilsHelper.renderItemColors(type).borderColor
                  }`,
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: "16px",
                    height: "16px",
                    border: `1px solid ${
                      UtilsHelper.renderItemColors(type).borderColor
                    }`,
                  }}
                />
                <InputBase
                  defaultValue={el.desc}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => editItem(e, el)}
                  sx={{ flex: 1, p: 0, height: "100%" }}
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
                    fill={UtilsHelper.renderItemColors(type).newTextColor}
                  />
                </Stack>
              </Paper>
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
  );
};

export default ListItems;
