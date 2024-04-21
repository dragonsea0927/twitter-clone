import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import React, { forwardRef } from "react";
import { useTrackPosition } from "./utils/use-track-position";
import styles from "./styles/emoji-picker-modal.module.scss";

export const EmojiPickerModal = forwardRef<
  HTMLButtonElement,
  { onClick: (e: EmojiClickData, event: MouseEvent) => void }
>(({ onClick }, ref) => {
  const boundaries = useTrackPosition({
    buttonRef: ref as React.RefObject<HTMLButtonElement>,
    trackScroll: true,
  });

  const style: React.CSSProperties = {
    position: "fixed",
    top: boundaries?.top ? boundaries?.top + boundaries?.height : "50%",
    left: boundaries?.left ? boundaries?.left + boundaries?.width : "50%",
    transform: boundaries?.top ? "translate(-50%, 0)" : "translate(-50%, -50%)",
  };

  return (
    <div style={style} className={styles.container}>
      <EmojiPicker
        theme={Theme.AUTO}
        onEmojiClick={onClick}
        emojiStyle={EmojiStyle.TWITTER}
        searchPlaceHolder="Search emojis"
        width={`100%`}
        height={`100%`}
        suggestedEmojisMode={SuggestionMode.RECENT}
      />
    </div>
  );
});

EmojiPickerModal.displayName = "EmojiPickerModal";
