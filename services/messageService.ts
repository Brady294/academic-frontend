import axios from "@/lib/axios";

const messageService = {
  async getConversations() {
    const { data } = await axios.get("/messages");
    return data;
  },

  async createConversation(subject: string) {
    const { data } = await axios.post("/messages", {
      subject,
    });

    return data;
  },

  async getMessages(id: number) {
    const { data } = await axios.get(
      `/messages/${id}`
    );

    return data;
  },

  async sendMessage(
    id: number,
    message: string,
    attachment?: string
  ) {
    const { data } = await axios.post(
      `/messages/${id}`,
      {
        message,
        attachment,
      }
    );

    return data;
  },
};

export default messageService;