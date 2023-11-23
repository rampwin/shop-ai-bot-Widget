import { createContext } from "react";

const AppContext = createContext({
  shopGptServerUrl: "",
  sessionId: "",
  shopId: "",
  token: "",
  welcomeMessage: "",
  initialPayload: "",
  metadata: {},
  botAvatar: "",
  widgetColor: "",
  botTitle: "",
  botSubTitle: "",
  userId: null,
  textColor: "",
  userMsgBackgroundColor: "",
  botMsgBackgroundColor: "",
  botMsgColor: "",
  userMsgColor: "",
  botResponseDelay: "",
  buttonsCss: {},
  chatHeaderCss: {},
  errorMessages: [],
  embedded: false,
});

export default AppContext;
