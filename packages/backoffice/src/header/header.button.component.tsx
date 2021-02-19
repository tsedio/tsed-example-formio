import { withOptionalIf } from "@project/shared";
import React, { PropsWithChildren } from "react";

export const HeaderButton = ({ onClick, children }: PropsWithChildren<any>) => (
  <span
    onClick={onClick}
    className='reset-anchor cursor-pointer flex font-sans font-bold items-center px-4 relative focus:text-blue hover:text-blue transition-color uppercase text-gray-darker focus:text-gray-darker-active hover:text-gray-darker-active navigation-arrow'
  >
    {children}
  </span>
);

export const IfHeaderButton = withOptionalIf(HeaderButton);
