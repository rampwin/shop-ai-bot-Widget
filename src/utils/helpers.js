import axios from "axios";

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
  rasaServerUrl,
  sender,
  message,
  metadata = {},
}) => {
  try {
    console.log("sender:-", sender);
    const response = await axios.post(
      "https://fb1f-183-83-54-141.ngrok-free.app/api/v1/openai-thread/test",
      {
        store_id: "655d951149e05bf43a0e34e0",
        message: "show me jumpsuits",
        session_id: "khviuhwiouhiohio",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpamF5LmRoYWtlZEByYW1wd2luLmNvbSIsImlkIjoiNjU0Yjg5ODAwMjU5NWM0N2Q1NjcwNmMzIiwiaWF0IjoxNzAwNTU3ODg0LCJleHAiOjE3MDE0MjE4ODR9.4miPd36mi9DeDkCo9Le_hWUEa_jAwVHFq2sMWrEb57Y",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error occurred fetching bot response", error);
    return [];
  }
};
