import React, { PropsWithChildren } from "react";
import { withIf } from "../../utils/directives/if.directive";
import { SidebarGroup, SidebarGroupProps } from "./sidebarGroup.component";
import { ToggleSidebar } from "./toggleSidebar.component";

export interface SidebarProps extends Record<string, any> {
  className?: string;
  sidebarOpen?: boolean;
  height?: string;
  items?: SidebarGroupProps[];
  onToggle?: (event: React.MouseEvent) => void;
  header?: React.ComponentType<any>;
  footer?: React.ComponentType<any>;
}

export function Sidebar({
  className = "",
  sidebarOpen,
  height = "65px",
  items,
  onToggle,
  header: Header,
  footer: Footer,
  children,
  ...props
}: PropsWithChildren<SidebarProps>) {
  return (
    <aside
      className={`fixed m-0 top-0 left-0 bottom-0 z-10 overflow-hidden group bg-sidebar-gray text-sidebar-white transition-all ${className}`}
    >
      <div className={"absolute top-0 left-0 h-full flex flex-col w-64"}>
        {Header ? (
          <div style={{ height }} className={"flex bg-sidebar-gray-active"}>
            <Header {...props} sidebarOpen={sidebarOpen} />
          </div>
        ) : null}
        <ul className='reset-list py-3 flex-1 overflow-auto'>
          {items.map((item, index) => {
            return (
              <li key={index} className={"px-2"}>
                <SidebarGroup
                  items={item.items}
                  title={item.title}
                  sidebarOpen={sidebarOpen}
                />
              </li>
            );
          })}
        </ul>
        {children}
        {Footer ? (
          <div style={{ height }} className={"flex bg-sidebar-gray-active"}>
            <Footer {...props} sidebarOpen={sidebarOpen} />
          </div>
        ) : null}
      </div>
      <ToggleSidebar onClick={onToggle} sidebarOpen={sidebarOpen} />
    </aside>
  );
}

export const IfSidebar = withIf(Sidebar);
