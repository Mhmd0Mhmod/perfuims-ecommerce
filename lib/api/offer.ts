import axios from "@/lib/axios";
import { Offer, OfferCoupon } from "@/types/offer";
import { PaginationParams } from "@/types/pageable";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";
import { throwingError } from "../utils";

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
  static async getAdminOffers(params?: PaginationParams): Promise<Offer[]> {
    try {
      const response = await authFetcher.get<Offer[]>(`/admin/offers`, {
        params,
      });
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

export class OfferCouponAPI {
  static async getAdminOfferCoupons(): Promise<OfferCoupon[]> {
    try {
      const response = await authFetcher.get(`/admin/coupons`);
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
