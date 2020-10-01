const API_KEY = '01aa316fe101b8eea45035bdbfdfb084';
const API_BASE = 'https://api.themoviedb.org/3';

//pega os originais netflix, os recomendados(trending), os em alta(top rated)
//ação, comedia, terror, romance, documentarios

//junta a url base com a pesquisa a ser feita e retorna o json recebido
const basicFetch = async(endpoint)=>{
  return (await fetch(`${API_BASE}${endpoint}`)).json();
}

export default {
  getHomeList: async ()=>{
    return[//retorna um array
        {
          slug:'originals',//pega determinada parte da url
          title:'Originais Netflix',
          items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
        },


        {
          slug:'trending',
          title: 'Recomendados para você',
          items:await basicFetch(`/trending/all/week?langage=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'toprated',
          title: 'Em alta',
          items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'action',
          title: 'Ação',
          items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'comedy',
          title: 'Comédia',
          items:await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'horror',
          title: 'Terror',
          items:await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'romance',
          title: 'Romance',
          items:await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
        },

        {
          slug:'documentary',
          title: 'Documentários',
          items:await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        }
      ]

  },

  getMovieInfo: async(movieId, type)=>{
    let info = {};
    if(movieId){
      switch(type){
        case 'movie':
            info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;

        case 'tv':
            info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);

        break;

        default:
          info = null;
        break;

      }
    }

    return info;
  }
}
