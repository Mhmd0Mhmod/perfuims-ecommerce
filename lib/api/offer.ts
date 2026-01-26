import axios from "axios";
import { throwingError } from "../utils";
import { Offer } from "@/types/offer";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";

export class OfferAPI {
  static async getOffers() {
    try {
      const { data } = await axios.get<Offer[]>("/api/offers");
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getOffersServer() {
    try {
      const { data } = await fetcher.get<Offer[]>("/offers");
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAdminOffers(): Promise<Offer[]> {
    try {
      const response = await authFetcher.get<Offer[]>(`/admin/offers`);
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getAdminOfferById(id: string): Promise<Offer> {
    try {
      const response = await authFetcher.get<Offer>(`/admin/offers/${id}`);
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
