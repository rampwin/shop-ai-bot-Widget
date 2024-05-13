import { createContext } from "react";

const AppContext = createContext({
  shopGptServerUrl: "",
  sessionId: "",
  shopId: "",
  token: "",
  welcomeMessage: "",
  initialPayload: "",
  metadata: {},
  server_endpoint: "",
  channel_id: "",
  position: "",
  account_id: null,
  botAvatar: "",
  widgetColor: "",
  botTitle: "",
  botSubTitle: "",
  channel_id: null,
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
