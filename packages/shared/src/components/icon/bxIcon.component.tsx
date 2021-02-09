import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export interface BxIconProps {
  name: string;
  color?: string;
  className?: string;
}

export function BxIcon({ name, color, className = "" }: BxIconProps) {
  className = classnames(
    "bx",
    name.includes("bx") ? name : `bx-${name}`,
    color ? `text-${color}` : "",
    className
  );

  return <i className={className} />;
}

BxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};
