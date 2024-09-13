import { Buttons } from "./messageComponents/Buttons";
import { Image } from "./messageComponents/Image";
import { List } from "./messageComponents/List";
import { TextMessage } from "./messageComponents/TextMessage";

export const BotMessage = ({
  messageItem,
  startsSequence,
  endsSequence,
  index,
}) => {
  const botResponse = [];
  let showBotAvatar = false;

  if (endsSequence) {
    showBotAvatar = true;
  }

  const handleInteractive = (message) => {
    switch (message.type) {
      case "list": {
        botResponse.push(
          <List
            action={message.action}
            key={`${index}_buttons`}
            showBotAvatar={showBotAvatar}
            ts={messageItem.ts}
            index={index}
            callback={messageItem.callback}
            body={messageItem.interactive.body}
          />
        );
        break;
      }
      case "button": {
        botResponse.push(
          <Buttons
            action={messageItem.interactive.action}
            key={`${index}_buttons`}
            showBotAvatar={showBotAvatar}
            ts={messageItem.ts}
            index={index}
            callback={messageItem.callback}
            body={messageItem.interactive.body}
          />
        );
        break;
      }
      case "cta_url": {
        botResponse.push(
          <Buttons
            action={messageItem.interactive.action}
            key={`${index}_cta_url`}
            showBotAvatar={showBotAvatar}
            ts={messageItem.ts}
            index={index}
            callback={messageItem?.callback}
            body={messageItem.interactive.body}
          />
        );
        break;
      }
      default:
        break;
    }
  };
  if (messageItem.type === "text") {
    botResponse.push(
      <TextMessage
        startsSequence={startsSequence}
        endsSequence={endsSequence}
        showBotAvatar={showBotAvatar}
        text={messageItem.text}
        key={`${index}_text`}
        ts={messageItem.ts}
      />
    );
  }
  if (messageItem.type === "interactive") {
    handleInteractive(messageItem.interactive);
  }

  if (messageItem.type === "image") {
    botResponse.push(
      <Image
        showBotAvatar={showBotAvatar}
        imageUrl={messageItem.src}
        ts={messageItem.ts}
        key={`${index}image`}
      />
    );
  }
  return botResponse;
};
