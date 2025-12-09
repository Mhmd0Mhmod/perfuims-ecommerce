import axiosInstance from "@/lib/axios";

export async function getAdminSizes(): Promise<Pagination<Size>> {
  try {
    const { data } = await axiosInstance.get<Pagination<Size>>("admin/sizes");
    return data;
  } catch (error) {
    throw error;
  }
}
