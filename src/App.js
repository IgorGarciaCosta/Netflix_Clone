import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default()=>{

  //useState é usado no lugar da variável state dentro do construtor
  //movieList é como é count:0
  //setMovieList é como o setState no onClick de um button
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{//quando a tela for carregada, roda essa função
    const loadAll = async()=>{
      //pega lista dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //pegar o filme em destaque (featured)
      let originals = list.filter(i=>i.slug === 'originals')
      //pegar um aleatorio dentro dos Originais
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length-1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)

      console.log({featuredData})

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      }
      else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)//cria o evento
    return()=>{
      window.removeEventListener('scroll', scrollListener)//remove o evento ao sair da página
    }
  }, []);

  return(
    <div className = 'page'>
      <Header black = {blackHeader}/>

      {featuredData && <FeaturedMovie item={featuredData}/>}
      <section className='lists'>
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
    </div>
  )
}
