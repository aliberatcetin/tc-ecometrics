import { HttpService } from "./HttpAdapter";

export default class ApiService extends HttpService {
  constructor(reportApiUrl) {
    super(reportApiUrl);
    this.fetchHistoryById = this.fetchHistoryById.bind(this);
    this.fetchHistories = this.fetchHistories.bind(this);
  }

  async fetchHistoryById(runId) {
    try {
      const response = await this
        .getAdapter()
        .get(`history/${runId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.errorDetail[0].message);
    }
  }

  async fetchHistories() {
    try {
      const response = await this
        .getAdapter()
        .get(`history`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.errorDetail[0].message);
    }
  }

  async uploadCsv(file) {
    try {
      const formData = new FormData();
      formData.append("csvfile", file);
      const response = await this
        .getAdapter()
        .post(`/csv`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

}

