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
  unaCollaSingularIPionera: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/unaCollaSingularIPionera.json`);
      const data = await response.json();
      return data;
    }
  },
  juntaITecnica: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/juntaITecnica.json`);
      const data = await response.json();
      return data;
    }
  },
  contacte: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/contacte.json`);
      const data = await response.json();
      return data;
    }
  },
  participa: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/participa.json`);
      const data = await response.json();
      return data;
    }
  },
  galeria: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/galeria.json`);
      const data = await response.json();
      return data;
    }
  },
  videos: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/videos.json`);
      const data = await response.json();
      return data;
    }
  },
  fotos: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/fotos.json`);
      const data = await response.json();
      return data;
    }
  },
  fesCastells: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/fesCastells.json`);
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
  anys52tuits: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/anys52tuits.json`);
      const data = await response.json();
      return data;
    }
  },
  calendari: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/data/calendari.json`);
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