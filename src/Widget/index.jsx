import { persistor, store } from "../store";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import AppContext from "./AppContext";
import { WidgetLayout } from "./WidgetLayout/widgetLayout";
import { SocketContextProvider } from "../SocketContext";

export const Widget = (props) => {
  return (
    <Provider store={store}>
      <AppContext.Provider value={{ ...props }}>
        <SocketContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <WidgetLayout {...props} />
          </PersistGate>
        </SocketContextProvider>
      </AppContext.Provider>
    </Provider>
  );
};

Widget.prototype = {
  shopGptServerUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  sessionId: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  shopId: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  welcomeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  initialPayload: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  server_endpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  metadata: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  botAvatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  widgetColor: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  botTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  botSubTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  userMsgBackgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  botMsgBackgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  botMsgColor: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  botResponseDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  userMsgColor: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  chatHeaderTextColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  buttonsCss: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  errorMessages: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  chatHeaderCss: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  embedded: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Widget.defaultProps = {
  welcomeMessage: null,
  initialPayload: "/greet",
  position: "right",
  widgetColor: "#8f001b",
  botAvatar:
    "https://1334637.fs1.hubspotusercontent-na1.net/hub/1334637/hubfs/logo.jpg",
  textColor: "#ffffff",
  userMsgBackgroundColor: "#8f001b",
  botTitle: "Hi! I'm Ava",
  server_endpoint: "http://localhost:4000/",
  channel_id: "66f124d1e5f31116d9b800e9",
  account_id: "615bfc72ba2a106ddcd46a2f",
  botSubTitle: "Sales & Services Assistant",
  botMsgBackgroundColor: "rgb(237,237,237)",
  botResponseDelay: "",
  chatHeaderCss: {
    textColor: "#ffffff",
    backgroundColor: "#8f001b",
    enableBotAvatarBorder: true,
  },
  chatHeaderTextColor: "#ffffff",
  botMsgColor: "#000000",
  userMsgColor: "#4c1d95",
  buttonsCss: {
    color: "#466d95",
    backgroundColor: "#8f001b",
    borderColor: "#8f001b",
    borderWidth: "0px",
    borderRadius: "999px",
    hoverBackgroundColor: "white",
    hoverColor: "#4b5563",
    hoverborderWidth: "1px",
    enableHover: false,
  },
};
