import axios from "@/lib/axios";

const downloadService = {
  async getDownloads() {
    const { data } =
      await axios.get("/downloads");

    return data;
  },

  download(id: number) {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/downloads/${id}`,
      "_blank"
    );
  },
};

export default downloadService;