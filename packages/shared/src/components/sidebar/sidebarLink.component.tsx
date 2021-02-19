import React from "react";
import { Link } from "react-router-dom";

export interface SidebarLinkProps extends Record<string, any> {
  href?: string;
  icon?: string;
  title?: string;
  sidebarOpen?: boolean;
}

export function SidebarLink({
  href,
  icon,
  title,
  sidebarOpen
}: SidebarLinkProps) {
  return (
    <Link
      to={href}
      className={
        "text-sidebar-white hover:text-sidebar-white-active flex block transition-all hover:bg-sidebar-gray-active rounded-small p-2"
      }
    >
      {/*<Icon svg={icon} width='1.2rem' className={"text-sidebar-icon"}/>*/}
      {sidebarOpen ? <span className={"flex-1 ml-1 px-2"}>{title}</span> : null}
    </Link>
  );
}
