import axiosInstance from "@/lib/axios";

export async function getCategories() {
  try {
    const response = await axiosInstance.get<Pagination<Category>>("admin/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
}
