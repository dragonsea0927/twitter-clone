import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "../ui/button";
import { EmojiIcon } from "@/assets/emoji-icon";
import Modal from "../elements/modal/modal";
import { EmojiPickerModal } from "./emoji-picker-modal";

const EmojiButton = ({
  setText,
  inputId,
}: {
  setText: Dispatch<SetStateAction<string>>;
  inputId: string;
}) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  };
 
  return (
    <>
      <Button
        type="button"
        aria-label="Add emoji"
        aria-haspopup="menu"
        ref={emojiButtonRef}
        aria-expanded={isEmojiPickerOpen}
        variant={"outline"}
        className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
        onClick={() => setIsEmojiPickerOpen(true)}
      >
        <EmojiIcon />
      </Button>

      {isEmojiPickerOpen && (
        <Modal
          onClose={() => setIsEmojiPickerOpen(false)}
          background="none"
          focusAfterClose={`#${inputId}`}
        >
          <EmojiPickerModal onClick={onEmojiClick} ref={emojiButtonRef} />
        </Modal>
      )}
    </>
  );
};

export default EmojiButton;
