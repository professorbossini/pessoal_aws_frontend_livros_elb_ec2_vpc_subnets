import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setURL] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [books, setBooks] = useState([]);

  const handleAddBook = async () => {
    try {
      console.log('post result', await axios.post("http://" + url + '/livros', { titulo: title, autor: author, edicao: edition }));
      console.log (title, edition, author)
      setTitle('');
      setAuthor('');
      setEdition('');
      fetchBooks();
      console.log('post complete')
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://" + url + '/livros');
      setBooks(response.data);
      console.log('fetchBooks: ' + JSON.stringify(response.data))
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  return (
    <div className="container mt-5">
      <input
        className="form-control"
        placeholder="Digite o Ip público da máquina Front End"
        value={url}
        onChange={e => setURL(e.target.value)}
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
