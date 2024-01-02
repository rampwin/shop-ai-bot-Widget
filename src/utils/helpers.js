export const createUserMessage = (message) => {
  return {
    text: message,
    sender: "USER",
    messageType: "text",
    ts: new Date(),
  };
};

export const getBotResponse = async ({
  welcomeMessage,
  message,
  socket,
  isEmitMessage,
  user,
}) => {
  let sessionId = localStorage.getItem("sessionId") || String(Date.now());
  localStorage.setItem("sessionId", sessionId);
  const postData = {
    userMessage: {
      message: message,
    },
    session: {
      conversationId: sessionId,
    },
  };

  try {
    if (message === "/greet" || message === "/restart") {
      return { botMessage: welcomeMessage };
    }
    if (isEmitMessage) {
      if (user?.isChatGptEnabled) {
        socket.emit("sent_message", postData);
        return { botMessage: null };
      } else {
        socket.emit(`user_sent_message`, { message, contactId: user._id });
        return { botMessage: "" };
      }
    }
    const response = { botMessage: message };
    return response;
  } catch (error) {
    console.log("error occurred fetching bot response", error);
    return [];
  }
};
