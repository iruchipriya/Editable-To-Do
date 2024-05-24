import React, { useState } from 'react';

const ToDo = () => {
  const [todo, setToDo] = useState();
  const [todoList, setToDoList] = useState([]);
  const [editText, setEditText] = useState('');

  const handleClear = () => {
    setToDo('');
  };

  const handleAdd = () => {
    if (
      todo.trim() !== '' &&
      !todoList.some((item) => item.text === todo.trim())
    ) {
      //check if does not exist already
      setToDoList([...todoList, { text: todo, done: false }]);
      setToDo('');
    } else {
      alert('To do is Already present');
    }
  };
  const handleDone = (index) => {
    const updatedTodolist = [...todoList];
    updatedTodolist[index].done = true;
    setToDoList(updatedTodolist);
  };

  const handleUndo = (index) => {
    const updatedList = [...todoList];
    updatedList[index].done = false;
    setToDoList(updatedList);
  };

  const handleDelete = (index) => {
    setToDoList((prevToDo) => prevToDo.filter((item, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditText(todoList[index].text);
    const updatedList = [...todoList];
    updatedList[index].editing = true;
    setToDoList(updatedList);
  };

  const handleEditSubmit = (index) => {
    const updatedList = [...todoList];
    updatedList[index].editing = false;
    updatedList[index].text = editText;
    setToDoList(updatedList);
  };

  return (
    <div>
      <div>To do List </div>
      <input
        placeholder={'Add..'}
        value={todo}
        onChange={(e) => {
          setToDo(e.target.value);
        }}
      />
      <button onClick={handleAdd}> Add</button>
      <button onClick={handleClear}> Clear</button>

      {todoList.map((item, index) => {
        return (
          <div
            key={index}
            style={{ textDecoration: item.done ? 'line-through' : '' }}
          >
            {item.editing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEditSubmit(index)}
              />
            ) : (
              <>
                {item.text}
                {!item.done && (
                  <button
                    onClick={() => {
                      handleDone(index);
                    }}
                  >
                    Done
                  </button>
                )}

                {item.done && (
                  <button
                    onClick={() => {
                      handleUndo(index);
                    }}
                  >
                    Undo
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ToDo;
