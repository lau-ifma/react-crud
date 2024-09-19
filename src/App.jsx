import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';


function App() {
  const backend_url = '//localhost:8080/users';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(backend_url)
      .then(res => setUsers(res.data))
      .catch(error => console.log(error));
  }, []);

  function postAPI(event){
    event.preventDefault();
    axios.post(backend_url, {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value
    }).then(() => {
      setModal(false);
      window.location.reload(); 
    })
  }

  function putAPI(userId){
    axios.put(backend_url+"/"+userId, {
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
  const OpenModalEdit = (user) => {
    setModalEdit(!modalEdit);
    const userId = user.id
    const nameUser = user.name
    const typeUser = user.type
    document.getElementById("userIdToPut").value = userId
    document.getElementById("userNameToPut").value = nameUser
    document.getElementById("userTypeToPut").value = typeUser
  };
  const CloseModalEdit= () => {
    setModalEdit(false);
  };

  return (
    <>
     <body className={`max-md:block flex justify-around items-start pt-[100px] bg-[url('/fundo.avif')] bg-cover bg-center h-screen`}>
      <input type="text" hidden id="userIdToPut"/>
      <input type="text" hidden id="userNameToPut"/>
      <input type="text" hidden id="userTypeToPut"/>
      
      <section className="max-md:w-[100%]">
        <h1 className=' max-md:pt-0 pt-[70px] text-3xl text-center font-semibold flex justify-center max-md:text-xl text-[#78da95]'>Gerenciamento de Contatos</h1>
        <div className='my-0 mx-auto mt-4 w-[600px] flex-col items-center p-3 max-md:w-[95%] text-center bg-black/30 backdrop-blur-lg rounded-lg border-2 border-gray-400'>
            <div className='flex justify-end mb-2'>
              <button
                className='font-semibold bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg'
                onClick={OpenModal}
                > Criar novo
              </button>
            </div>

          <table className='bg-gray-900 w-[100%] border'>
            <thead className='text-gray-200 h-[40px]'>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>

            <tbody className='bg-gray-600 text-center text-gray-200'>
              {users.length === 0 && ( <th colSpan={5}>Sem contatos cadastrados.</th>)}
              {users.map(user => (
                <tr key={user.id} className="h-[40px] border-b-2 border-gray-500">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.type}</td>
                  <td className="bg-gray-200">
                    <FaEdit onClick={() => OpenModalEdit(user)} className="text-orange-500 text-xl hover:text-orange-700 ml-[45%]" />
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
          <div className="overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className=" bg-black/20 backdrop-blur-lg p-5 border rounded-lg w-[400px] max-md:w-[95%]">
              <h2 className="text-xl mb-4 text-center font-semibold text-gray-100">Editar Usuário</h2>
              <form >
                <div className="mb-4">
                  <label className="block text-gray-200 font-medium">Novo nome:</label>
                  <input type="text" placeholder="Digite o nome" name="name" id="name" defaultValue={document.getElementById("userNameToPut").value} required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                  />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 font-medium">Novo Telefone:</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      name="type"
                      id="type"
                      placeholder="Digite o telefone"
                      defaultValue={document.getElementById("userTypeToPut").value}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={CloseModalEdit}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
                    >Cancelar
                    </button>

                    <button type="submit" onClick={() => putAPI(document.getElementById("userIdToPut").value)}
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
          <div className=" bg-black/20 backdrop-blur-lg p-5 border rounded-lg w-[400px] max-md:w-[95%]">
            <h2 className="text-xl mb-4 text-center font-semibold text-gray-100">Criar novo contato</h2>
              <form >
                <div className="mb-4">
                  <label className="block text-gray-200 font-medium">Nome</label>
                  <input type="text" name="name" id="name" placeholder="Ex: João"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                  />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 font-medium">Telefone</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      name="type"
                      id="type"
                      placeholder="Digite o telefone"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                      type="button" onClick={CloseModal}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
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
      </section>

      <div className="max-lg:hidden">
          <img className="w-[400px] max-lg:w-[310px] image-float" src="/img1.png" alt="foto" /> 
      </div>
    </body>
    </>
  );
}

export default App;
