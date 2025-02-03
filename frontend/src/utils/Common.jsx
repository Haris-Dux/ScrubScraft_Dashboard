

export const buildQueryParams = (params) => {
    return Object.entries(params)
      .filter(([_, value]) => value) 
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
  };