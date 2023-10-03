import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [backendUrl, setBackendUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [books, setBooks] = useState([]);

  const handleAddBook = async () => {
    try {
      await axios.post("http://" + backendUrl + ':3000/livros', { titulo: title, autor: author, edicao: edition });
      setTitle('');
      setAuthor('');
      setEdition('');
      fetchBooks();
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://" + backendUrl + ':3000/livros');
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  return (
    <div className="container mt-5">
      <input
        className="form-control"
        placeholder="Digite o IP (local, privado) da máquina Back End"
        value={backendUrl}
        onChange={e => setBackendUrl(e.target.value)}
      />

      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleAddBook}>
          Cadastrar Livro
        </button>
        <button className="btn btn-secondary" onClick={fetchBooks}>
          Buscar Livros
        </button>
      </div>

      <div className="mt-3">
        <input
          className="form-control"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="form-control mt-2"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          className="form-control mt-2"
          placeholder="Edição"
          value={edition}
          onChange={e => setEdition(e.target.value)}
        />
      </div>

      <ul className="list-group mt-3">
        {books.map(book => (
          <li key={book.id} className="list-group-item">
            {book.titulo} - {book.autor} - Edição: {book.edicao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
