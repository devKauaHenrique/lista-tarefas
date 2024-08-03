import { useState } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState<string []>([]);
  const [editTarefa, setEditTarefa] = useState({
    enabled: false,
    tarefa: ''
  })

  function registrarTarefa(){
    if(!input){
      alert("Preencha o campo!!");
      return;
    }

    if(editTarefa.enabled){
      salvarEdit();
      return;
    }

    setTarefas (tarefas => [...tarefas, input]) 
    setInput('');
  }

  function editarItem(item: string){
    setInput(item);
    setEditTarefa({
      enabled: true,
      tarefa: item
    })
  }

  function salvarEdit(){
    const findIndexTarefa = tarefas.findIndex(tarefas => tarefas === editTarefa.tarefa)

    const allTarefas = [...tarefas];
    allTarefas[findIndexTarefa] = input;
    
    setTarefas(allTarefas)
  
    setEditTarefa({
      enabled: false,
      tarefa: ''
    })

    setInput('');
  }

  function excluirItem(item: string){
    const removerTarefa = tarefas.filter(tarefa => tarefa !== item);
    setTarefas(removerTarefa)
  }

  return (
    <div className='body'>
      <h1>Lista de Tarefas</h1>
      <h2>Usando o useState do React JS + Typescript!</h2>

      <div className='container'>
        <div className='tarefas'>
          <input
          placeholder='Digite sua tarefa...'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          />
          <button className='add' onClick={registrarTarefa}>
            {editTarefa.enabled ? "Editar Tarefa" : "Adicionar Tarefa"}
          </button>
        </div>

        <div>
          {tarefas.map((item, index) => (
            <section key={item}>
              <span>{item}</span>
              <div className='botoes'>
                <button className='btn-tarefas editar' onClick={() => editarItem(item)}>Editar</button>
                <button className='btn-tarefas excluir' onClick={() => excluirItem(item)}>Excluir</button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
