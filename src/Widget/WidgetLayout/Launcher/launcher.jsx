import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContext from "../../AppContext";
import { setToggleWidget } from "../../widgetSlice";
import { motion, AnimatePresence } from "framer-motion";

import { XMarkIcon } from "@heroicons/react/24/solid";
export const Launcher = () => {
  const dispatch = useDispatch();
  let toggleWidget = useSelector((state) => state.widgetState.toggleWidget);
  const appContext = useContext(AppContext);
  const { widgetColor, botAvatar, textColor, position } = appContext;
  return (
    <motion.div
      animate={{
        scale: [0, 1.1, 1],
      }}
      id="widget_launcher"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`fixed ${position}-5 bottom-5 inline-flex cursor-default items-center rounded-full p-1 text-center text-sm font-medium text-white xs:${position}-0`}
      style={{ backgroundColor: widgetColor, color: textColor }}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setToggleWidget(!toggleWidget));
      }}
    >
      <AnimatePresence>
        {toggleWidget ? (
          <motion.div
            animate={{
              rotate: [0, 90],
            }}
          >
            <XMarkIcon className="h-12 w-12" />
          </motion.div>
        ) : (
          <motion.div>
            <img src={botAvatar} className="h-12 w-12 rounded-full" alt="bot" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
