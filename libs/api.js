const staticDataUrl = process.env.STATIC_DATA_URL;

const api = {
  home: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/home.json`);
      const data = await response.json();
      return data;
    }
  },
  colla: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/colla.json`);
      const data = await response.json();
      return data;
    }
  },
  anys50tuits: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/anys50tuits.json`);
      const data = await response.json();
      return data;
    }
  },
};


export default api;