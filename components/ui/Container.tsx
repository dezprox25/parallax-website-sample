import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
