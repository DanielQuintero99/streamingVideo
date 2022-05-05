import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { FavContext } from '../Context/FavContext';



const Listado = () => {
  const {addFav} = useContext(FavContext);
  let validarToken = sessionStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    let endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=31d9b609cfecf29b811f9380926551d4&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    axios.get(endPoint)
      .then(res => {
        let apiData = res.data
        setMovieList(apiData.results)
      }).catch(error=> Swal.fire({
        icon: 'error',
        title: 'No se pudo establecer conexion con el servidor',
        text: 'Intentalo mas tarde',
      }))
  }, [setMovieList]);
  return (
    <>
      {!validarToken ? <Navigate to={"/"} /> :
        <>
          <h1>Listado</h1>
          {
            movieList.map((item, i) => {
              return (
                <Card key={i} sx={{ maxWidth: 345  }}>
                  <CardMedia
                    component="img"
                    alt={`${item.title} image`}
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.overview}
                    </Typography>
                  </CardContent>
                  <CardActions>
                   <Link to={`/pelicula/${item.id}`} > <Button size="small">Learn More</Button></Link>
                   <Typography variant="body2" color="text.secondary">
                    <button onClick={()=>{addFav(item,item.id)}} className='favoritesBtn'>❤️</button> 
                   </Typography> 
                  </CardActions>
                </Card>
              )
            })
          }



        </>
      }
    </>
  )
}

export default Listado