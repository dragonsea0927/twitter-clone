import { supabase } from "@/lib/supabase-client";
import { createId } from "@paralleldrive/cuid2";
import axios from "axios";

export const postMedia = async ({
  files,
  tweet_id,
  message_id,
}: {
  files: File[];
  tweet_id?: string;
  message_id?: string;
}) => {
  try {
    files.forEach(async (file) => {
      const imagePath = createId();

      const { error } = await supabase.storage
        .from("images")
        .upload(`image-${imagePath}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.log("error", error);
        throw new Error("Failed to upload image");
      } else {
        const { data: mediaUrl } = supabase.storage
          .from("images")
          .getPublicUrl(`image-${imagePath}`);

        const media = {
          ...(tweet_id && { tweet_id }),
          ...(message_id && { message_id }),
          media_url: mediaUrl?.publicUrl,
          media_type: "image",
          media_path: `image-${imagePath}`,
        };

        await axios.post("/api/media", {
          media,
        });
      }
    });

    return true;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
