import axiosClass from "axios";
const axios = axiosClass.create({
  paramsSerializer: {
    indexes: null,
  },
});
export default axios;
