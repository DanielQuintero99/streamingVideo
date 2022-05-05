import React,{useContext} from 'react'
import { Navigate,Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FavContext } from '../Context/FavContext';


const Favoritos = () => {
const{removeFromFav}=useContext(FavContext)
let jsonFavs=localStorage.getItem("Favoritos");
let favs=JSON.parse(jsonFavs)
let token=sessionStorage.getItem("token")
  return (
    <>
    {!token ? <Navigate to={"/"} /> :
        <>
        {
        favs.length===0 ? <><h1>No hay favoritos</h1> <Link to={'/'}>Volver al Listado</Link></> : 
        <>
         <h1>Favoritos</h1>
          {
            favs.map((item, i) => {
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
                   <button onClick={()=>removeFromFav(item.id)} >REMOVE</button>
                  </CardActions>
                </Card>
            )
          })
    }
        </>
         }
        </>
    } 
    </>
  )
}



export default Favoritos