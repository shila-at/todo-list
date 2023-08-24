import { forwardRef } from "react";
import { type SvgIconProps } from "@mui/material/SvgIcon";

const PlusIcon = forwardRef<SVGSVGElement, SvgIconProps>(function PlusIcon(
  props,
  ref
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      ref={ref}
      {...props}
    >
      <rect width="1.714" height="12" x="5.143" rx="0.857"></rect>
      <rect
        width="1.714"
        height="12"
        y="6.857"
        rx="0.857"
        transform="rotate(-90 0 6.857)"
      ></rect>
    </svg>
  );
});

export default PlusIcon;
