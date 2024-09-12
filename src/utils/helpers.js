export const createUserMessage = (message) => {
  return {
    text: message.title || message,
    sender: "USER",
    messageType: "text",
    ts: new Date(),
  };
};
