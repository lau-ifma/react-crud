import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const backend_url = '//localhost:8080/users';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(backend_url)
      .then(res => setUsers(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1 className='text-2xl text-center'>Gerenciamento de Usuários</h1>

      <div className='my-0 mx-auto mt-2 bg-gray-300 w-[600px] rounded-md flex-col items-center p-3'>
        <div className='flex justify-end mb-2'>
          <button
            className='font-semibold bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg'
          >
            Criar novo
          </button>
        </div>

        <table className='bg-gray-500 w-[100%] rounded-md'>
          <thead className='text-gray-200 h-[40px]'>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody className='bg-gray-100 text-center'>
          <tr className="h-[40px] border-b-2 border-gray-500">
            <td>1</td>
            <td>Raimundo</td>
            <td>Vigia</td>
            <td className="flex justify-around">
              <td> <FaEdit className="text-orange-500 text-xl hover:text-orange-700 mt-2"/></td>
              <td> <MdDelete className="text-red-500 text-xl hover:text-red-700 mt-2"/></td>
            </td>
          </tr>

            {users.map(user => (
              <tr key={user.id} className="h-[40px] border-b-2 border-gray-500">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.type}</td>
                <td className="flex justify-around">
                  <FaEdit className="text-orange-500 text-xl hover:text-orange-700 mt-2" />
                  <MdDelete className="text-red-500 text-xl hover:text-red-700 mt-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
