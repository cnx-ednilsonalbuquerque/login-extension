import { useEffect, useState } from "preact/hooks";
import { encryptStorage } from "../../utils/storage";

export type ListItem = {
  origin: string;
  email: string;
  password: string;
};

export function ListLogins() {
  const [list, setList] = useState<ListItem[]>([]);

  const removeLogin = (item: ListItem) => {
    const newArr = [...list];

    const itemId = newArr?.findIndex(
      (it) =>
        item?.email === item?.email &&
        it.origin === item.origin &&
        it.password === item.password
    );

    newArr.splice(itemId, 1);
    setList(newArr);
    encryptStorage.setItem("list", newArr);
  };

  useEffect(() => {
    const currentList = encryptStorage.getItem<ListItem[]>("list");
    setList(currentList!);
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-6 p-2 max-h-[280px] scroll-m-3 overflow-hidden overflow-y-auto">
      {(list?.length === 0 || !list) && (
        <div className="mx-auto mt-2">Nenhum login cadastrado ainda!</div>
      )}

      {list?.map((item) => (
        <div className="flex flex-col gap-2">
          <p className="border-b-2 border-gray-500 text-gray-500">
            {item?.origin}
          </p>

          <div className="flex justify-between items-center">
            <span>{item?.email}</span>

            <div className="flex gap-4 items-center">
              <span>{item?.password}</span>

              <div
                className="px-3 py-1 cursor-pointer flex items-center justify-center bg-[#e45] w-fit rounded-md text-red-200"
                onClick={() => removeLogin(item)}
              >
                x
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
