import { HTMLAttributes } from "preact/compat";
import { clsx } from "clsx";

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-lg mt-4 bg-[#4c38ff] p-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4230e2]",
        "focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        "focus-visible:outline focus-visible:outline-2 transition-colors"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
