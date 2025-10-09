import React from "react";
import './HeaderMenu.css';

import MenuItem from "../menuItem/MenuItem";


export default function HeaderMenu({ menus, activeMenu, onChange, highlightRef, menuRef }) {
  return (
    <div className="header-menu" ref={menuRef}>
      {menus.map((menu) => (
        <MenuItem
          key={menu.key}
          active={menu.key === activeMenu}
          onClick={() => onChange(menu.key)}
        >
          {menu.label}
        </MenuItem>
      ))}
      <div className="menu-highlight" ref={highlightRef}></div>
    </div>
  );
}
