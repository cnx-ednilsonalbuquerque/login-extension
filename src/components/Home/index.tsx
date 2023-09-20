import { useEffect, useState } from "preact/hooks";
import Select from "../Select";

export function Home({
  inputs,
  changeInput,
}: {
  inputs: { name: string; id: string; currentId: string }[];
  changeInput: (id: string, value: string, currentId: string) => void;
}) {
  const [inputList, setInputList] = useState<
    { name: string; id: string; currentId: string }[]
  >([]);

  useEffect(() => {
    setInputList(inputs);
  }, [inputs]);

  return (
    <div className="flex flex-col gap-2">
      {inputList?.length === 0 && (
        <div className="mx-auto mt-2">
          Nenhum input encontrado nessa página!
        </div>
      )}
      {inputList?.map((input) => (
        <Select
          input={input}
          onChange={(value) => changeInput(input.id, value, input.currentId)}
        />
      ))}
    </div>
  );
}
