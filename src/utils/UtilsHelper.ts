import { colorPalette } from "@uiKits/colors/Color";

export class UtilsHelper {
  public static renderItemColors = (type: string) => {
    switch (type) {
      case this.ListType[0].name:
        return {
          bgColor: colorPalette.pink10,
          titleColor: colorPalette.pink150,
          textColor: colorPalette.pink50,
          newTextColor: colorPalette.pink100,
          borderColor: colorPalette.pink30,
        };
      case this.ListType[1].name:
        return {
          bgColor: colorPalette.gold10,
          titleColor: colorPalette.gold150,
          textColor: colorPalette.gold50,
          newTextColor: colorPalette.gold100,
          borderColor: colorPalette.gold30,
        };
      case this.ListType[2].name:
        return {
          bgColor: colorPalette.green10,
          titleColor: colorPalette.green150,
          textColor: colorPalette.green50,
          newTextColor: "",
          borderColor: colorPalette.green30,
        };
      default:
        throw new Error();
    }
  };

  public static ListType = [
    { id: 1, name: "Todo" },
    { id: 2, name: "Doing" },
    { id: 3, name: "Done" },
  ];
}
