import { useState } from "preact/hooks";
import Button from "../Button";
import Input from "../Input";
import { TargetedEvent } from "preact/compat";
import { encryptStorage } from "../../utils/storage";

export function Form() {
  const [login, setLogin] = useState({
    origin: "",
    email: "",
    password: "",
  });

  const handleChangeInput = (key: string) => (
    event: TargetedEvent<HTMLInputElement, Event>
  ) => {
    setLogin((prevState) => ({
      ...prevState,
      [key]: event.currentTarget.value,
    }));
  };

  const handleSaveLogin = () => {
    if (!login?.email || !login?.origin || !login?.password) {
      alert("Preencha todos os campos");
      return;
    }

    const currentLogins = encryptStorage.getItem("list") || [];

    const newLogins = [...currentLogins, login];

    encryptStorage.setItem("list", newLogins);

    setLogin({
      origin: "",
      email: "",
      password: "",
    });
  };

  return (
    <form className="flex flex-col gap-2 max-w-[460px]">
      <Input
        label="Origem"
        placeholder="plataforma-b2b"
        value={login?.origin}
        onChange={handleChangeInput("origin")}
      />
      <Input
        value={login?.email}
        label="E-mail"
        onChange={handleChangeInput("email")}
      />
      <Input
        label="Senha"
        value={login?.password}
        onChange={handleChangeInput("password")}
      />

      <Button onClick={handleSaveLogin}>Salvar</Button>
    </form>
  );
}
