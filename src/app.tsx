import Tabs from "./components/Tabs";
import { TabItem } from "./components/TabItem";
import { ListLogins } from "./components/ListLogins";
import { Form } from "./components/Form";
import { Home } from "./components/Home";
import { useEffect, useRef, useState } from "preact/hooks";
import { clsx } from "clsx";

export function App() {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState<
    { name: string; id: string; currentId: string }[]
  >([]);

  const isMounted = useRef(false);

  const changeInput = (id: string, value: string, currentId: string) => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id || 0, {
            type: "INPUT",
            id,
            currentId,
            value,
          });
        }
      );
  };

  useEffect(() => {
    if (!isMounted.current) {
      chrome.tabs &&
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type: "GET_DOM" },
              (response) => {
                setTitle(response?.title);
                setInputs(response?.inputNames);
              }
            );
          }
        );
      isMounted.current = true;
    }
  }, []);

  return (
    <div
      className={clsx(
        "min-w-[480px] w-full p-8 flex flex-col gap-4 items-center h-screen text-white",
        "bg-gradient-to-tl from-[#181C23] to-[#1B2230]"
      )}
    >
      <h1>My logins</h1>
      {title}
      <Tabs>
        <TabItem value="0">
          <Home inputs={inputs} changeInput={changeInput} />
        </TabItem>
        <TabItem value="1" conditionalRendering>
          <Form />
        </TabItem>

        <TabItem value="2" conditionalRendering>
          <ListLogins />
        </TabItem>
      </Tabs>
    </div>
  );
}
