import axiosInstance from "@/lib/axios";

export async function getCategories() {
  try {
    const response = await axiosInstance.get("admin/categories");
    return response;
  } catch (error) {
    throw error;
  }
}
