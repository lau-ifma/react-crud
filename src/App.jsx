
import './App.css'

function App() {
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

        <tbody className='bg-gray-100 text-center'>
          <tr>
            <td>1</td>
            <td>Raimundo</td>
            <td>Vigia</td>
            <td>Vigiar escola</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Francisco</td>
            <td>Professor</td>
            <td>Dar aulas</td>
          </tr>
        </tbody>

      </table>
    </div>
    </>
  )
}

export default App
