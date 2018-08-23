const api = "http://localhost:8080/todos";

export const getTodos = async() => {
  var res = await fetch(api)
  return res.json();
};

export const createTodo = async (name) => {
  var res = await fetch(api, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({name, status:"todo", id: Math.random()*10000})
  })
  
  return res.json();
}

export const updateTodo = async(todo) => {
  const res = await fetch(`${api}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo)
  })
  return res.json();
}

export const removeTodo = async(id) => {
  const res = await fetch(`${api}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
  })
  return res.json();
}