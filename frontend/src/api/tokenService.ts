import axiosInstance from "./axiosInstance";

class TokenService {
  private refreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  subscribeTokenRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  async refreshToken() {
    try {
      if (!this.refreshing) {
        this.refreshing = true;
        const response = await axiosInstance.post("/auth/refresh");
        const { accessToken } = response.data;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
          this.onRefreshed(accessToken);
        }

        this.refreshing = false;
        return accessToken;
      }
    } catch (error) {
      this.refreshing = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw error;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}

export default new TokenService();
