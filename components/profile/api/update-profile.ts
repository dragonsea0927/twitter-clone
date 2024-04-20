import axios from "axios";
import { IProfile } from "../types";
import { postImage } from "./post-image";

export const updateProfile = async (profile: IProfile, userId: string) => {
  if (!profile) return;

  try {
    let bannerUrl: string | undefined;
    let avatarUrl: string | undefined;

    if (profile?.banner?.file) {
      bannerUrl = await postImage(profile?.banner?.file, "banners");
    }
    if (profile?.avatar?.file) {
      avatarUrl = await postImage(profile?.avatar?.file, "avatars");
    }

    const { data } = await axios.put(`/api/users/${userId}`, {
      user_id: userId,
      name: profile?.name,
      bio: profile?.bio,
      location: profile?.location,
      coverImage: bannerUrl ? bannerUrl : profile?.banner?.url,
      profileImage: avatarUrl ? avatarUrl : profile?.avatar?.url,
    });

    return data;
  } catch (error: any) {
    return error.message;
  }
};
