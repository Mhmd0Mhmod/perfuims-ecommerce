import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import { Offer } from "@/types/offer";

export async function getAdminOffers(page: number = 0, size: number = 10): Promise<Pagination<Offer>> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get<Pagination<Offer>>(
      `admin/offers`,
      { params: { page, size } }
    );
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}