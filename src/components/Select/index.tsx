import { useEffect, useId, useState } from "preact/hooks";
import { ListItem } from "../ListLogins";
import { encryptStorage } from "../../utils/storage";
import { useLoginStore } from "../../store";
import { clsx } from "clsx";

type SelectProps = {
  input: { id: string; name: string; currentId: string };
  onChange: (value: string, id: string, currentId: string) => void;
};

export default function Select({ input, onChange }: SelectProps) {
  const id = useId();
  const activeTab = useLoginStore((state) => state.activeTab);

  const [list, setList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const currentList = encryptStorage.getItem<ListItem[]>("list");

    const newArray = currentList!
      ?.map((item) => {
        const { origin, email, password } = item;
        return [
          {
            label: `${origin} - Email`,
            value: email,
          },
          {
            label: `${origin} - Password`,
            value: password,
          },
        ];
      })
      .flat();

    setList(newArray);
  }, [activeTab]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-100"
      >
        {input.name}
      </label>
      <select
        id={id}
        onChange={(event) =>
          onChange(event.currentTarget.value, input.id, input.currentId)
        }
        defaultValue=""
        className={clsx(
          "mt-2 block w-full rounded-lg border-0 py-3 px-4 text-[#C8C9CE] ring-1 ring-inset",
          "ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
          "bg-transparent"
        )}
      >
        <option value="">Selecione</option>
        {list?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
