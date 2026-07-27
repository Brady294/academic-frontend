import axios from "@/lib/axios";

export interface UploadedFile {
  id: number;
  filename: string;
  original_name: string;
  file_size: number;
  created_at: string;
}

async function upload(
  orderId: number | string,
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await axios.post(
    `/uploads/${orderId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

async function getOrderFiles(
  orderId: number | string
): Promise<UploadedFile[]> {
  const { data } = await axios.get(
    `/uploads/${orderId}`
  );

  return data;
}

async function deleteOrderFile(
  id: number | string
) {
  const { data } = await axios.delete(
    `/uploads/file/${id}`
  );

  return data;
}

/* Named exports */

export {
  upload,
  getOrderFiles,
  deleteOrderFile,
};

/* Default object for existing pages */

const uploadService = {
  upload,
  getFiles: getOrderFiles,
  deleteFile: deleteOrderFile,
};

export default uploadService;