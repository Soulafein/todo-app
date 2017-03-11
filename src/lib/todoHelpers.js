export const addTodo = (list, item) => {
  return [...list, item]
}

export const generateId = () => Math.floor(Math.random()*100000)

export const findById = (id, list) => {
  return list.find(item => item.id === id)
}

export const toggleTodo = (item) => {
  return {...item, isCompleted: !item.isCompleted}
}

export const updateTodo = (list, updatedItem) => {
  const updatedIndex = list.findIndex(item => item.id === updatedItem.id)
  return [...list.slice(0, updatedIndex), updatedItem, ...list.slice(updatedIndex+1)]
}

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [...list.slice(0, removeIndex), ...list.slice(removeIndex+1)]
}
