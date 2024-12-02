const Divider = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center text-sm mb-7">
    <div className="border-t border-gray-300 flex-grow"></div>
    <span className="px-4 text-[rgba(108,115,127,1)]">{text}</span>
    <div className="border-t border-gray-300 flex-grow"></div>
  </div>
);

export default Divider;
