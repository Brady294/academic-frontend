import axios from "@/lib/axios";

const uploadService = {
  async upload(orderId: number | string, file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      `/uploads/${orderId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  async getFiles(orderId: number | string) {
    const response = await axios.get(`/uploads/${orderId}`);

    return response.data;
  },

  async deleteFile(id: number | string) {
    const response = await axios.delete(`/uploads/file/${id}`);

    return response.data;
  },
};

export default uploadService;