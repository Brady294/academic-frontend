import axios from "@/lib/axios";

const revisionService = {
  async getRevisions() {
    const { data } =
      await axios.get("/revisions");

    return data;
  },

  async createRevision(
    payload: {
      order_id: number;
      title: string;
      instructions: string;
    }
  ) {
    const { data } =
      await axios.post(
        "/revisions",
        payload
      );

    return data;
  },
};

export default revisionService;