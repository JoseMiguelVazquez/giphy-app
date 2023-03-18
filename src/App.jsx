import { useState, useEffect } from 'react'
import ImageCard from './components/ImageCard'
import './App.css'
import SearchBar from './components/SearchBar'

function App () {
  const [gifs, setGifs] = useState([])
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30&rating=g`)
      .then(response => response.json())
      .then(results => {
        setGifs(results.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const sendSearch = (search) => {
    if (search === '') {
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30&rating=g`)
        .then(response => response.json())
        .then(results => {
          setGifs(results.data)
        }).catch(error => {
          console.log(error)
        })
    } else {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=30&offset=0&rating=g&lang=en`)
        .then(response => response.json())
        .then(results => {
          setGifs(results.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div className='App'>
      <h1>Giphy App</h1>
      <SearchBar handleSearch={sendSearch} />
      <div className='grid-cards'>
        {
          gifs.map(gif => (
            <ImageCard
              key={gif.id + generateId()}
              url={gif.images.fixed_height.url}
              title={gif.title}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
