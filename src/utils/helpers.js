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

// const tempData = [{ text: "apple" }, { text: "orange" }];

export const getBotResponse = async ({
  shopGptServerUrl,
  sessionId,
  shopId,
  token,
  welcomeMessage,
  message,
}) => {
  try {
    if (message === "/greet" || message === "/restart") {
      return { message: welcomeMessage };
    }
    const response = await axios.post(
      shopGptServerUrl,
      {
        store_id: shopId,
        message: message,
        session_id: sessionId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error occurred fetching bot response", error);
    return [];
  }
};
