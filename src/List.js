import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, removeItem, editList }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { title, id } = item;
        return (
          <article key={id} className="todo-item">
            <h4 className="title">{title}</h4>
            <div className="btn-container">
              <button
                type="button"
                className="btn-style"
                onClick={() => editList(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="btn-style"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
