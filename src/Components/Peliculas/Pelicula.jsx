import React,{useEffect, useState} from 'react'
import { Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Pelicula = () => {
    let token=sessionStorage.getItem("token");
    const { movieId } = useParams();
    const [movie,setMovie]=useState([])
    const[genero,setGenero]=useState([])
    let endPoint= `https://api.themoviedb.org/3/movie/${movieId}?api_key=31d9b609cfecf29b811f9380926551d4&language=es-ES`
    useEffect(() => {
        axios.get(endPoint).then(res=>{
            setMovie(res.data);
            setGenero(res.data.genres)
        })
    }, [movieId])

  return (
    <>
    {
        token? 
        <>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Titulo: {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Reseña: {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Generos:{
         genero.map((item,i)=>{
        return(
            <li key={i} >{item.name}</li> 
        )
    })
    }
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Rate: {movie.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Numero de votos: {movie.vote_count}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </> 
        : 
        <Navigate to={"/"}/>
    }
    </>
  )
}

export default Pelicula