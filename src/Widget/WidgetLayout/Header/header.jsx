import { useContext } from "react";
import AppContext from "../../AppContext";

export const Header = () => {
  const appContext = useContext(AppContext);
  const { botSubTitle, botTitle, botAvatar, chatHeaderCss } = appContext;

  const { textColor, backgroundColor } = chatHeaderCss;
  return (
    <>
      <div
        className="relative flex h-[20%]  cursor-default items-center space-x-4  rounded-t-[1.8rem]  p-2 shadow-lg drop-shadow"
        style={{ backgroundColor, color: textColor }}
      >
        <div
          className="shrink-0 rounded-full   p-2"
          style={{ borderColor: textColor }}
        >
          <img
            className="h-12 w-12 rounded-full"
            src={botAvatar}
            alt="Bot Logo"
          />
        </div>
        <div className="w-full ">
          <div className="text-xl font-semibold antialiased">{botTitle}</div>
          <p className="">{botSubTitle}</p>
        </div>
      </div>
    </>
  );
};
