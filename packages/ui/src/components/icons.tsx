import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export function IconChevronDown(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="Chevron down icon"
      fill="none"
      height={16}
      role="presentation"
      viewBox="0 0 16 16"
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function ExternalLinkIcon({
  height = 9,
  width = 9,
  ...props
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="External link icon"
      fill="none"
      height={height}
      role="presentation"
      viewBox="0 0 7 7"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.20592 6.84333L0.379822 6.01723L4.52594 1.8672H1.37819L1.38601 0.731812H6.48742V5.83714H5.34421L5.35203 2.6933L1.20592 6.84333Z"
        fill="currentColor"
      />
    </svg>
  );
}
