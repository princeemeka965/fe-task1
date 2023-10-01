import axios from "axios";

let BASE_URL: string = "http://127.0.0.1:4010/api";

export const formApi = {
  getFormSchema() {
    return axios.get(
      `${BASE_URL}/515.1416329633107/programs/magnam/application-form`
    );
  },
};
