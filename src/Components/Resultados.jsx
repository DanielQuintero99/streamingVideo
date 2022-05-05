
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"


const Resultados = () => {
    const{search}=useParams();
    const [resultados, setResultados] = useState([]);
    useEffect(() => {
     let endPoint=`https://api.themoviedb.org/3/search/movie?api_key=31d9b609cfecf29b811f9380926551d4&language=es-ES&query=${search}&page=1&include_adult=false`
     axios.get(endPoint).then((res)=>{
         setResultados(res.data.results)
        }).catch(error=>{console.log(error)})
    }, [search]);

  return (
    <>
        <h2>Resultados para: <p>{search}</p></h2>
        {resultados.length===0&& <h2>Tu busqueda no arrojo resultados, intentalo nuevamente</h2>}
        {
            resultados.map((item,i)=>{
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
                      </CardActions>
                    </Card>
                  )
            })
        }
    </>
  )
}

export default Resultados