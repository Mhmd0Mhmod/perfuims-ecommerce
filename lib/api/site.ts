import { fetcher } from "../fetcher";
import { throwingError } from "../utils";

export class Site {
  static async getSiteSocailMeida() {
    try {
      const { data } = await fetcher.get<{
        facebookUrl: string;
        instagramUrl: string;
        twitterUrl: string;
        whatsappNumber: string;
      }>("settings");
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
