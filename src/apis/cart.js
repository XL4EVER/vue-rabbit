import request from './request'

export const getCartList = () => request.get('/cart')
export const addToCart = (data) => request.post('/cart', data)
export const updateCart = (id, data) => request.put(`/cart/${id}`, data)
export const deleteCartItem = (id) => request.delete(`/cart/${id}`)