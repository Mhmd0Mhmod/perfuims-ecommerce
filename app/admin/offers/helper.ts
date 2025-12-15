import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import { Offer } from "@/types/offer";

export async function getAdminOffers(): Promise<Offer[]> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get<Offer[]>(
      `admin/offers`,
    );
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getAdminOfferById(id: string): Promise<Offer> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get<Offer>(
      `admin/offers/${id}`,
    );
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}