import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "./loader.actions";

export interface UseFormLoaderProps extends Record<string, any> {
  name: string;
  src?: string;
}

export function useFormLoader({ name, src, ...props }: UseFormLoaderProps) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(!!src);

  useEffect(() => {
    if (isActive) {
      dispatch(showLoader(name));
    } else {
      setTimeout(() => dispatch(hideLoader(name)), 300);
    }
  }, [isActive]);

  return {
    ...props,
    src,
    isActive,
    formReady() {
      setIsActive(false);
    }
  };
}
