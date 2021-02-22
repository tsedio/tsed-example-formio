import React from "react";
import { Link } from "react-router-dom";
import { BxIcon } from "../icon/bxIcon.component";

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
        "text-sidebar-white hover:text-sidebar-white-active flex items-center block transition-all hover:bg-sidebar-gray-active rounded p-2"
      }
    >
      <BxIcon name={icon} className={"text-sidebar-icon text-lg"} />
      {sidebarOpen ? <span className={"flex-1 ml-1 px-2"}>{title}</span> : null}
    </Link>
  );
}
