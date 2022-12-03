document
  .getElementById("chatInput")
  .addEventListener("keydown", keypressListener);

let currMsgKeyEvents = [];
// Catch all incoming keys and save their key value and time.
// On enter pass all keys to animateMessage().
function keypressListener(keyEvent) {
  if (keyEvent.key === "Enter") {
    animateMessage();
    document.getElementById("chatInput").value = "";
    return;
  } else {
    currMsgKeyEvents.push({
      key: keyEvent.key,
      timestamp: keyEvent.timeStamp,
    });
  }
}

// Animate what the user typed including deletions
async function animateMessage() {
  if (currMsgKeyEvents.length < 1) return;
  filterMessage();
  const chatWindow = document.getElementById("chatWindow");
  let messageLength = 0;

  for (let index = 0; index < currMsgKeyEvents.length; index++) {
    const currElem = currMsgKeyEvents[index];
    if (index > 0) {
      const delay = currElem.timestamp - currMsgKeyEvents[index - 1].timestamp;
      await new Promise((r) => setTimeout(r, delay));
    }
    if (currElem.key === "Backspace") {
      if (messageLength > 0) {
        chatWindow.innerHTML = chatWindow.innerHTML.slice(0, -1);
        messageLength--;
      } else {
        continue;
      }
    } else {
      chatWindow.innerHTML += currElem.key;
      messageLength++;
    }
  }
  chatWindow.innerHTML += "<br>";
  currMsgKeyEvents = [];
}

function filterMessage() {
  for (const k of currMsgKeyEvents) {
    if (k.key == "Shift") {
      k.key = "";
    }
  }
}
