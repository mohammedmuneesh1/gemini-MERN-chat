const ChatItemSkeleton = () => {
  return (
    <div
      className="
        px-[10px] py-[7px]
        rounded-[10px]
        bg-[#2c2937]/60
        animate-pulse
      "
    >
      <div
        className="
          h-4 w-[70%]
          bg-gray-500/30
          rounded
        "
      />
    </div>
  );
};

export default ChatItemSkeleton;
