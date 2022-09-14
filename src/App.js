import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

// getting local Storage value
const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  }
  return [];
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [selectedOption, setSelectedOption] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display some alert message
      showAlert(true, 'danger', 'Please enter the value');
    } else if (name && isEditing) {
      // display different method
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setIsEditing(false);
      setEditID(null);
      showAlert(true, 'success', 'Edit success');
    } else {
      // update the list array and display list
      showAlert(true, 'success', 'Submitted');
      const newName = { id: new Date().getTime().toString(), title: name };
      setList([...list, newName]);
      setName('');
    }
  };

  // shows alert depending on the submit value
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  // clear all list
  const clearList = () => {
    showAlert(true, 'danger', 'emptied');
    setList([]);
  };

  // remove individual item
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    const newItem = list.filter((item) => item.id !== id);
    setList(newItem);
  };

  // handle edit function
  const editList = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title);
  };

  // saving in local storage using useEffect when change happens to list
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Your Todo Lists</h3>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="e.g. running"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List items={list} removeItem={removeItem} editList={editList} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
