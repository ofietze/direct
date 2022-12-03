document
  .getElementById("chatInput")
  .addEventListener("keydown", keypressListener);

const chatWindow = document.getElementById("chatWindow");
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
  let messageLength = 0;

  for (let index = 0; index < currMsgKeyEvents.length; index++) {
    const currElem = currMsgKeyEvents[index];
    if (index > 0) {
      const delay = currElem.timestamp - currMsgKeyEvents[index - 1].timestamp;
      await new Promise((r) => setTimeout(r, delay));
    }
    messageLength = handleKey(currElem, messageLength);
  }
  chatWindow.innerHTML += "<br>";
  currMsgKeyEvents = [];
}

function handleKey(k, messageLength) {
  if (k.key === "Backspace") {
    // Only delete as long as there is something to delete
    if (messageLength > 0) {
      chatWindow.innerHTML = chatWindow.innerHTML.slice(0, -1);
      messageLength--;
    }
  } else {
    chatWindow.innerHTML += k.key;
    messageLength++;
  }
  return messageLength;
}

function filterMessage() {
  for (const k of currMsgKeyEvents) {
    if (k.key == "Shift") {
      k.key = "";
    }
  }
}
