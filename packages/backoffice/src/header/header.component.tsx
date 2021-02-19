import { withIf } from "@project/shared/src";
import noop from "lodash/noop";
import React from "react";
import { HeaderButton } from "./header.button.component";

export interface HeaderProps {
  auth?: any;
  className?: string;
  height?: string;
  title?: string;
  onLogout?: () => void;
  page?: any;
  currentTitle?: any;
}

export function Header(props: HeaderProps) {
  const {
    auth,
    className = "",
    height = "65px",
    title,
    onLogout = noop,
    page,
    currentTitle
  } = props;

  return (
    <div style={{ height }}>
      <header
        style={{ height }}
        className={`mb-5 fixed left-0 top-0 right-0 z-10 transition-all ${className}`}
      >
        <div className='absolute top-0 inset-x-0 z-4'>
          <div
            className='fadeInLong absolute bg-white top-0 inset-x-0'
            aria-label={`${title} main navigation`}
          >
            <div
              className={
                "border-b-1 border-gray-light flex items-stretch justify-between px-5"
              }
              style={{ height }}
            >
              <ul
                aria-label={`${title} main navigation`}
                className='reset-list flex'
                role='menubar'
                style={{ flex: "1 1 auto" }}
              >
                <li className='flex items-stretch'>
                  {page && (
                    <div
                      className={"flex font-happiness items-center relative"}
                    >
                      <span
                        style={{ top: "-2px" }}
                        className={"flex items-center"}
                      >
                        {/*<BxIcon*/}
                        {/*  svg={page.icon}*/}
                        {/*  width='1.2rem'*/}
                        {/*  className={"text-blue-active"}*/}
                        {/*/>*/}
                      </span>
                      <span className={"flex items-center text-md ml-3"}>
                        {page.parent.title}
                        <span className={"text-xs mx-2 text-blue-active"}>
                          {" "}
                          &gt;{" "}
                        </span>
                        {page.title}
                        {currentTitle ? (
                          <span>
                            <span className={"text-xs mx-2 text-blue-active"}>
                              {" "}
                              &gt;{" "}
                            </span>{" "}
                            {currentTitle}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  )}
                </li>
              </ul>
              <div className='flex flex-no-shrink relative'>
                <div className={"flex relative px-4 items-center"}>
                  {page && page.headerNav}
                </div>

                <div
                  className={
                    "header__user-info flex font-sans font-bold items-center px-4 relative text-blue"
                  }
                >
                  <span
                    className={
                      "bg-gray-light p-2 flex items-center rounded-full justify-center mr-1 text-white"
                    }
                  >
                    {/*<Icon svg={USER} width='0.8rem' />*/}
                  </span>
                  <span className='ml-1'>
                    {auth.user.data.firstName || "Super GO"}{" "}
                    {auth.user.data.lastName}
                  </span>
                </div>

                <HeaderButton
                  className={"header__link-logout"}
                  to='/auth'
                  onClick={onLogout}
                >
                  {/*<Icon svg={SIGNOUT} width='1.0rem' />*/}
                </HeaderButton>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export const IfHeader = withIf(Header);
