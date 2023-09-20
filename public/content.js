const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  let inputs = Array.from(document.querySelectorAll("input"))?.filter(
    (input) => input.id !== "tokenBirdID"
  );

  inputs.forEach((input, index) => (input.dataset.id = `input-${index}`));

  inputs = inputs?.map((input) => ({
    name: input.name,
    id: input.dataset.id,
    currentId: input.id,
  }));

  let contentEditable = Array.from(
    document.querySelectorAll("[contenteditable]")
  );

  contentEditable.forEach(
    (input, index) => (input.dataset.id = `content-${index}`)
  );

  contentEditable = contentEditable?.map((input) => ({
    name: input.name,
    id: input.dataset.id,
    currentId: input.id,
  }));

  const response = {
    title: document?.title || "site",
    inputNames: [...inputs, ...contentEditable],
  };

  if (msg.type === "INPUT") {
    const input = document.querySelector(`[data-id=${msg.id}]`);

    if (msg.value) {
      if (msg?.id?.includes("content")) {
        input.textContent = msg.value;
        return;
      }

      input.value = msg.value;

      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.dispatchEvent(new Event("blur", { bubbles: true }));
    }

    input.click();
  }

  sendResponse(response);
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
