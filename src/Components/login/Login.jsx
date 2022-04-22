import React,{useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Listado from '../HomePage/Listado';

const Login = () => {
  const [showList, setshowList] = useState(false);
  // funcion para manejar el submit del formulario login, con este se valida que la informacion que ingresa el usuario sea correcta
    const submitHandler=(e)=>{
  // prevent default para evitar que la pagina se recargue tras pulsar el boton submit
        e.preventDefault()
  // estas variables basicamente toman el valor(value) del target(inputs email y password) y las setea para trabajar con ellas de forma mas comoda
        const email=e.target.email.value;
        const password=e.target.password.value;
  // el regex por lo general se toma de internet y sirve para validar caracteres
        const regexEmail =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  // Validaciones
        if (email ==="" || password==="") {
          Swal.fire({
            icon: 'warning',
            title: 'Los campos no pueden estar vacios',
          })
          return;
        }
        if (email !=="" && !regexEmail.test(email)) {
          Swal.fire({
            icon: 'error',
            title: 'Correo electronico no valido',
            text: 'El correo electronico que ingresaste no es valido',
          })
          return;
        }
        if (email!=="challenge@alkemy.org"||password!=="react") {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales no validas',
            text: 'El correo electronico o la contraseña no coincide con ningun usuario registrado en nuestra plataforma',
          })
          return;
        }
        
  // el metodo post de axios recibe como parametros la url de la api a la cual nos vamos a conectar y un objeto con las credenciales
        axios.post('http://challenge-react.alkemy.org',{email,password})
        .then(res=>{
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
          title: 'bienvenido, esperamos que disfrutes tu estadia'
        })
      // res.data.token nos devuelve un token el cual es un identificador de inicio de secion, esta enpriptado, por lo cual es compllicado saber quien fue la persona que lo tomo
      const tokenRecibido=res.data.token;
      // para esta app almacenare el token en el LocalStorage, el cual es un obj, setItem es un metodo mediante el cual se puede guardar algo dentro del ls,recibe dos parametros(nombre de la info y la info correspondiente), en este caso, como el token es un string no necesito hacer stringyfy
     localStorage.setItem('token',tokenRecibido);
       setshowList(true) 
    })
        .catch(res=>{
          Swal.fire({
            icon: 'error',
            title: `${res}`,
            text: 'Error en el servidor, intentalo mas tarde',
          })
        })
      
    }

  return (
    <>{(showList?
    <Listado/>
    :
    <>
    <h1>Bienvenido</h1>
    <form onSubmit={submitHandler}>
        <label>
        <span>Correo Electronico: </span>
        <input type="text" name='email'/>
        </label>
        <label>
        <span>Contraseña: </span>
        <input type="password" name='password'/>
        </label>
        <button type='submit'>Ingresar</button>
    </form></>
    )}
    </>
  )
}

export default Login