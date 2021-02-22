import React, { PropsWithChildren } from "react";
import { Button } from "../button/button.component";

export function ButtonTab({
  icon,
  back,
  onClick,
  isActive,
  children
}: PropsWithChildren<any>) {
  return (
    <div
      className={`relative last:mr-0 ${isActive ? "z-2" : ""} ${
        back ? "-ml-2 mr-0" : "mr-1"
      }`}
    >
      <Button
        component={"button"}
        color={!back ? (isActive ? "primary" : "gray-700") : "secondary"}
        bgColor={!back ? (!isActive ? "gray-100" : "white") : "white"}
        borderColor={!back ? "gray-300" : "white"}
        className={"border-b-0 relative outline-none focus:outline-none"}
        paddingX={back ? 2 : 3}
        rounded={"none"}
        onClick={onClick}
      >
        <i className={icon} />
        <span className={"text-sm whitespace-no-wrap"}>{children}</span>
      </Button>
      <div
        className={
          "z-1 absolute top-0 right-0 left-0 border-t-2 " +
          (isActive ? "border-primary" : "border-transparent")
        }
      />
    </div>
  );
}

export interface TabsItemProps extends Record<string, any> {
  label: string;
  icon: string;
  path: string;
}

export interface TabsProps extends Record<string, any> {
  current?: TabsItemProps;
  items?: TabsItemProps[];
  style?: any;
  className?: string;
  onClick?: (item: TabsItemProps) => void;
}

export function Tabs({
  style,
  current,
  items = [],
  children,
  className,
  onClick
}: PropsWithChildren<TabsProps>) {
  return (
    <div className={`tabs ${className}`} style={style}>
      <nav className='list-reset'>
        <div className='overflow-auto'>
          <div className='relative flex flex-no-shrink items-center pt-1 px-1'>
            <div className='border-b-1 border-gray-light absolute bottom-0 left-0 right-0 z-1' />
            {items
              .filter((item) => item.label || item.icon)
              .map((item, index) => {
                return (
                  <ButtonTab
                    key={index}
                    back={item.back}
                    isActive={current?.action === item.action}
                    exact={item.exact}
                    onClick={() => {
                      onClick && onClick(item);
                    }}
                    reverseBg={true}
                    {...item}
                  >
                    {item.label}
                  </ButtonTab>
                );
              })}
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
