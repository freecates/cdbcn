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
  vuitDeJuny1969: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/vuitDeJuny1969.json`);
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
  actuacions: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/actuacions.json`);
      const data = await response.json();
      return data;
    }
  },
  noticies: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/noticies.json`);
      const data = await response.json();
      return data;
    }
  },
  avisLegal: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/avisLegal.json`);
      const data = await response.json();
      return data;
    }
  },
  politicaDeCookies: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/politicaDeCookies.json`);
      const data = await response.json();
      return data;
    }
  },
  footer: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/footer.json`);
      const data = await response.json();
      return data;
    }
  },
  routes: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/routes.json`);
      const data = await response.json();
      return data;
    }
  },
};


export default api;