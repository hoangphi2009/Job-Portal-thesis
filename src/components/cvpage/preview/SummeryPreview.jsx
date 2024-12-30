import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const SummeryPreview = () => {
  const { singleCv } = useSelector((store) => store.cv);
  const summery = singleCv?.cv?.personalDetails?.summery;
const sanitizeConfig = {
  ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "ul", "ol", "li", "p", "u"],
};
  return (
    <div>
      <div
        className="text-sm my-2"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(summery, sanitizeConfig),
        }}
      />
    </div>
  );
};

export default SummeryPreview;
