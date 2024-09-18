import { useContext } from "react";
import AppContext from "../../../../AppContext";
import { formattedTs, MardownText } from "../../utils";
import { FaFileAlt } from "react-icons/fa";

export const Media = ({ showBotAvatar, messageBody, ts }) => {
  const appContext = useContext(AppContext);
  const { botAvatar, botMsgColor, botMsgBackgroundColor } = appContext;

  const renderMedia = (file) => {
    switch (file.type) {
      case "image": {
        return (
          <div
            className={`w-fit min-w-[10%] max-w-[75%] self-start whitespace-pre-line  break-words text-sm text-white`}
          >
            <img
              className="rounded-xl shadow-sm"
              src={messageBody.message}
              alt="imgAlt"
            />
          </div>
        );
      }
      case "video": {
        return (
          <div
            className={`w-fit min-w-[10%] max-w-[75%] self-start whitespace-pre-line  break-words text-sm text-white`}
          >
            <video
              className="rounded-xl shadow-sm"
              controls
              src={messageBody.message}
              alt="imgAlt"
            />
          </div>
        );
      }
      case "audio": {
        return (
          <div
            className={`w-fit min-w-[10%] max-w-[75%] self-start whitespace-pre-line break-words text-sm text-white`}
          >
            <audio
              className="rounded-xl shadow-sm"
              src={messageBody.message}
              controls
            />
          </div>
        );
      }
      default: {
        return (
          <div
            className={`w-fit min-w-[10%] max-w-[75%] self-start whitespace-pre-line  break-words text-sm text-white`}
          >
            <a
              href={messageBody.message}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileAlt className="text-8xl text-gray-500" />
            </a>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex space-x-1">
      <div className={`flex w-5 items-start`}>
        <img
          className={`h-5 w-5 rounded-full ${showBotAvatar ? "" : "hidden"}`}
          src={botAvatar}
          alt="BotAvatar"
        />
      </div>
      <div className="flex max-w-[calc(75%)] flex-col space-y-1">
        {renderMedia(messageBody)}
        {messageBody.text && (
          <div
            className={`w-max whitespace-pre-line break-words rounded-[20px] px-[15px]  py-[12px] text-center text-sm`}
            style={{
              color: botMsgColor,
              backgroundColor: botMsgBackgroundColor,
              maxWidth: "100%",
            }}
            dir="auto"
          >
            <MardownText text={messageBody.text} />
          </div>
        )}
        {showBotAvatar && (
          <div className="text-[10px] italic  text-gray-500">
            {formattedTs(ts)}
          </div>
        )}
      </div>
    </div>
  );
};
