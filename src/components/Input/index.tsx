import { HTMLAttributes, useId } from "preact/compat";
import { clsx } from "clsx";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...rest }: InputProps) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          className={clsx(
            "block w-full rounded-lg border-0 py-3 px-5 text-[#C8C9CE] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600",
            "focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            "bg-transparent"
          )}
          {...rest}
        />
      </div>
    </div>
  );
}
