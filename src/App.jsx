import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const backend_url = '//localhost:8080/users'
  useEffect(() => {
    axios.get(backend_url)
    .then(res => setUsers(res.data))
    .catch(error => console.log(error))
  }, []);
  const [users, setUsers] = useState([]);

  return (
    <>
    <h1 className='text-2xl text-center'>Gerenciamento de Usuarios</h1>

    <div className='my-0 mx-auto mt-2 bg-gray-300 w-[600px] rounded-md flex-col items-center p-3'>

      <div className='flex justify-end mb-2'>
          <button className='bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg'>criar novo</button>
      </div>

      <table className='bg-gray-500 w-[100%] rounded-md'>
        <thead className='text-gray-200'>
          <th>ID</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Acoes</th>
        </thead>

        <tbody className='bg-gray-100 text-center users'>
          <tr>
            <td>1</td>
            <td>Raimundo</td>
            <td>Vigia</td>
            <td>Vigiar escola</td>
          </tr>
          {users.map( user => {
            return(
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.type}</td>
              <td>Vigiar escola</td>
            </tr>
            )
          })}
        </tbody>

      </table>
    </div>
    </>
  )
}

export default App

