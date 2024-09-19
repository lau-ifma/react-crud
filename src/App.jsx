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

  function postAPI(){
    axios.post(backend_url, {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value
    })
  }

  function deleteUser(userId){
    axios.delete(backend_url+"/"+userId)
    window.location.reload();
  }

  const [modal, setModal] = useState(false);
  const OpenModal = () => {
    setModal(!modal);
  };
  const CloseModal= () => {
    setModal(false);
  };

  const [modalEdit, setModalEdit] = useState(false);
  const OpenModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const CloseModalEdit= () => {
    setModalEdit(false);
  };

  return (
    <>
      <h1 className='text-2xl text-center font-semibold flex justify-center max-md:text-xl'>Gerenciamento de Usuários</h1>
      <div className='my-0 mx-auto mt-2 bg-gray-300 w-[600px] rounded-md flex-col items-center p-3 max-md:w-[95%]'>
        <div className='flex justify-end mb-2'>
          <button
            className='font-semibold bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg'
            onClick={OpenModal}
            > Criar novo
          </button>
        </div>

        <table className='bg-gray-500 w-[100%] rounded-md'>
          <thead className='text-gray-200 h-[40px]'>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody className='bg-gray-100 text-center'>

            {users.map(user => (
              <tr key={user.id} className="h-[40px] border-b-2 border-gray-500">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.type}</td>
                <td className="bg-gray-200">
                  <FaEdit onClick={OpenModalEdit} className="text-orange-500 text-xl hover:text-orange-700 ml-[45%]" />
                </td>
                <td className="bg-gray-200">
                  <MdDelete onClick={() => deleteUser(user.id)} className="text-red-500 text-xl hover:text-red-700 ml-[45%]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalEdit && (
        <div className="overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[400px] max-md:w-[95%]">
            <h2 className="text-xl mb-4 text-center font-semibold">Editar Usuário</h2>
            <form >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Novo nome:</label>
                <input type="text" name="name" id="name" required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Novo tipo:</label>
                  <input type="text" name="type" id="type" required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                  />
              </div>
              <div className="flex justify-between">
                  <button type="button" onClick={CloseModalEdit}
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold"
                  >Cancelar
                  </button>

                  <button type="submit" onClick={postAPI}
                    className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold"
                    >Atualizar
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal && (
        <div className="overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[400px] max-md:w-[95%]">
            <h2 className="text-xl mb-4 text-center font-semibold">Criar Novo Usuário</h2>
            <form >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Nome</label>
                <input type="text" name="name" id="name" required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Tipo</label>
                  <input type="text" name="type" id="type" required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                  />
              </div>
              <div className="flex justify-between">
                  <button
                    type="button" onClick={CloseModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold"
                  >Cancelar
                  </button>

                  <button
                    type="submit"
                    onClick={postAPI}
                    className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold"
                    >Criar
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

export default App;
