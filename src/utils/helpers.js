import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

export const createUserMessage = (message) => {
  return {
    text: message,
    sender: "USER",
    messageType: "text",
    ts: new Date(),
  };
};

export const getBotResponse = async ({
  shopGptServerUrl,
  // sessionId,
  shopId,
  token,
  welcomeMessage,
  message,
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
      return { message: welcomeMessage };
    }
    // const response = await axios.post(
    //   shopGptServerUrl,
    //   {
    //     store_id: shopId,
    //     message: message,
    //     session_id: sessionId,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //   }
    // );
    const response = await axios.post(
      "https://chatbot-api.anitechgroup.com/api/v1/create-completion",
      postData
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error occurred fetching bot response", error);
    return [];
  }
};
