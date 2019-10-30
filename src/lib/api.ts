interface LocationInfo {
  timeOffset: number;
}

export interface Api {
  getLocationInfo(location: string): Promise<LocationInfo>;
}

export const api: Api = {
  async getLocationInfo() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      timeOffset: -5
    };
  }
};
