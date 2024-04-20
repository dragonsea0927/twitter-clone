import { supabase } from "@/lib/supabase-client";
import { createId } from "@paralleldrive/cuid2";

export const postImage = async (file: File, bucket: string) => { 
 

  try {
    const imagePath = createId(); 

    const { error, data } = await supabase.storage
      .from(bucket)
      .upload(`${bucket}-${imagePath}`, file);
 

    if (error) {
      throw new Error(error.message);
    } else {
      const { data: mediaUrl } = await supabase.storage
        .from(bucket)
        .getPublicUrl(`${bucket}-${imagePath}`);

      return mediaUrl?.publicUrl;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
