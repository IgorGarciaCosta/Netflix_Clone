import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import './App.css'

export default()=>{

  //useState é usado no lugar da variável state dentro do construtor
  //movieList é como é count:0
  //setMovieList é como o setState no onClick de um button
  const [movieList, setMovieList] = useState([])

  useEffect(()=>{//quando a tela for carregada, roda essa função
    const loadAll = async()=>{
      //pega lista dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list)
    }

    loadAll()
  }, []);
  return(
    <div className = 'page'>
      <section className='lists'>
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
    </div>
  )
}
