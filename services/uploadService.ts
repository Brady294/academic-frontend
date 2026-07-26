import api from "@/lib/axios";

export interface UploadedFile {
  id: number;
  order_id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}

export interface UploadResponse {
  message: string;
  file: UploadedFile;
}

export async function uploadOrderFile(
  orderId: number,
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/uploads/${orderId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getOrderFiles(
  orderId: number
): Promise<UploadedFile[]> {
  const response = await api.get(
    `/uploads/${orderId}`
  );

  return response.data;
}

export async function deleteOrderFile(
  fileId: number
) {
  const response = await api.delete(
    `/uploads/file/${fileId}`
  );

  return response.data;
}