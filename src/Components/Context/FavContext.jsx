import React, { useState, createContext} from 'react'
import Swal from 'sweetalert2';


export const FavContext=createContext();
const FavContextProvider = ({children}) => {
    let jsonFavs=localStorage.getItem("Favoritos");
    let newfavs=JSON.parse(jsonFavs);
    const [favs,setFavs]=useState(newfavs);
    const addFav = (item,id)=>{
        let newFavs=favs;
        let existe=false;
        newFavs.forEach(element=>{
            if(element.id===id){
                existe=true;
                Swal.fire({
                    icon: 'warning',
                    title: 'Ya agregaste esta peli a tus favoritos',
                  })
            }
        })
        if(!existe){
            newFavs.push(item);
            setFavs(newFavs);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: `Agregaste ${item.title} a tus favoritos`
              })
        }
        localStorage.setItem("Favoritos",JSON.stringify(favs))
    }
   
    const removeFromFav=(id)=>{
        let newFavs=favs.filter(fav=>fav.id!==id);
        setFavs(newFavs);
        localStorage.setItem("Favoritos",JSON.stringify(newFavs))
    }
      
  return (
     <FavContext.Provider value={{addFav,removeFromFav,favs}} >
         {children}
     </FavContext.Provider>
  )
}

export default FavContextProvider