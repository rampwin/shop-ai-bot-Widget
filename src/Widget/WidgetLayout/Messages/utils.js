import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const formattedTs = (ts) => {
  return moment(ts).format("ddd, MMM D, h:mm A");
};

export const MardownText = ({ text, className }) => {
  return (
    <ReactMarkdown
      children={text}
      className={className}
      remarkPlugins={[remarkGfm]}
    ></ReactMarkdown>
  );
};
