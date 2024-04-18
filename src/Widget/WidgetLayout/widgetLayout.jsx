import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./Header/header";
import { Keypad } from "./Keypad/keypad";
import { Launcher } from "./Launcher/launcher";
import { Messages } from "./Messages/messages";

export const WidgetLayout = (props) => {
  const dispatch = useDispatch();
  let { toggleWidget, channel_id: _channelId } = useSelector(
    (state) => state.widgetState
  );
  let { channel_id, embedded, position } = props;
  let userIdRef = useRef(_channelId);

  useEffect(() => {
    if (channel_id) {
      userIdRef.current = channel_id;
    }
  }, [dispatch, embedded, props.channel_id, toggleWidget, channel_id]);

  if (embedded) {
    return (
      <AnimatePresence>
        <div
          className="fixed    flex h-full w-full  flex-col rounded-[1.8rem]   bg-white  font-lato   shadow-md"
          key="widget"
        >
          <Header />
          <Messages />
          <Keypad />
        </div>
      </AnimatePresence>
    );
  }
  return (
    <AnimatePresence>
      {toggleWidget && (
        <motion.div
          className={`fixed bottom-5 ${position}-5 z-50 flex flex-col rounded-[1.8rem] bg-white font-lato  ring-1 ring-black/5  sm:h-[calc(50%+100px)] sm:w-[calc(50%)] md:h-[calc(50%+100px)] md:w-[calc(50%)] lg:h-[calc(100%-100px)]  lg:w-[calc(25%)]    xs:right-0 xs:h-[calc(100%-200px)] xs:w-full`}
          animate={{ y: -60 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          key="widget"
        >
          <Header />
          <Messages />
          <Keypad />
        </motion.div>
      )}
      <Launcher />
    </AnimatePresence>
  );
};
