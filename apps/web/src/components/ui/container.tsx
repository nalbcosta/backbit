import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & { children: ReactNode };
export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
