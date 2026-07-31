import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonCommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

type ButtonLinkProps = ButtonCommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonElementProps = ButtonCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonLinkProps | ButtonElementProps;

function getButtonClassName({
  className = "",
  variant = "primary",
  fullWidth = false,
}: Pick<ButtonCommonProps, "variant" | "fullWidth"> & { className?: string }) {
  const styles =
    variant === "primary"
      ? "bg-(--action-bg) text-(--action-fg) hover:bg-(--accent)"
      : "border border-(--line) text-(--ink) hover:border-(--action-bg) hover:bg-(--action-bg) hover:text-(--action-fg)";
  const width = fullWidth ? "w-full" : "";
  return `inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${width} ${className}`;
}

function ButtonLink({ children, className, variant, fullWidth, ...props }: ButtonLinkProps) {
  return <Link className={getButtonClassName({ className, variant, fullWidth })} {...props}>{children}</Link>;
}

function ButtonElement({ children, className, variant, fullWidth, type = "button", ...props }: ButtonElementProps) {
  return <button className={getButtonClassName({ className, variant, fullWidth })} type={type} {...props}>{children}</button>;
}

export function Button(props: ButtonProps) {
  if ("href" in props) {
    return <ButtonLink {...props} />;
  }

  return <ButtonElement {...props} />;
}
