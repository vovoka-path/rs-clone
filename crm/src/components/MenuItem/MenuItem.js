import Link from "../Link/Link.js";
import Image from "../Image/Image.js";
import ListItem from "../ListItem/ListItem.js";

class MenuItem {
  create(
    orderStatus,
    data,
    classForLink,
    classForListItem,
    atrrForLink,
    atrrForListItem,
  ) {
    const { path, ru } = data;
    const listItem = ListItem.create(
      classForListItem,
      atrrForListItem,
      path,
      orderStatus,
    );
    const link = Link.create(classForLink, path, orderStatus, ru, atrrForLink);
    const img = Image.create("menu-img", `./public/${orderStatus}.png`);

    listItem.append(link, img);

    return listItem;
  }
}

export default new MenuItem();
