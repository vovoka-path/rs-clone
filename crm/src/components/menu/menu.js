import menuData from "../../data/menuData.json" assert { type: "json" };
import Container from "../Container/Container.js";
import MenuItem from "../MenuItem/MenuItem.js";
import List from "../List/List.js";

export class Menu {
  constructor(cabName) {
    this.cabName = cabName;
    this.styles = {
      container: "menu-container",
      ul: "menu-items",
      li: "menu-item",
      a: "menu-link",
    };
    this.nameAttr = {
      li: "menu-item-li",
      a: "menu-item-a",
    };
  }

  create() {
    const menuContainer = Container.create(this.styles.container);
    const menu = List.create(this.styles.ul);

    for (let [orderStatus, data] of Object.entries(menuData[this.cabName])) {
      menu.append(
        MenuItem.create(
          orderStatus,
          data,
          this.styles.a,
          `${this.styles.li} ${orderStatus}`,
          this.nameAttr.a,
          this.nameAttr.li,
        ),
      );
    }

    menuContainer.append(menu);

    return menuContainer;
  }
}


