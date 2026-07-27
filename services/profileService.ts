import axios from "@/lib/axios";

const profileService = {
  async getProfile() {
    const { data } = await axios.get(
      "/profile/me"
    );

    return data;
  },

  async updateProfile(profile: any) {
    const { data } = await axios.put(
      "/profile/me",
      profile
    );

    return data;
  },

  async updateAvatar(avatar: string) {
    const { data } = await axios.put(
      "/profile/avatar",
      {
        avatar,
      }
    );

    return data;
  },
};

export default profileService;