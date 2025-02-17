import axios from 'axios'

const MASTER_URL = "http://localhost:8090/adminOps"

export const searchById = (key) => {
   return axios.get(MASTER_URL + "/findById/" + key)
}

export const editComic = (editedComic) => {
   return axios.post(MASTER_URL + "/editComic", editedComic)
}

export const getAllComics = () => {
    return axios.get(MASTER_URL + "/findAllComics")
}

export const completeOrder = (orderId) => {
    return axios.get(MASTER_URL + "/completeOrder/" + orderId)
}

export const getAllOrders = () => {
   return axios.get(MASTER_URL + "/findAllOrders")
}

export const getOngoingOrders = () => {
   return axios.get(MASTER_URL + "/findAllOngoingOrders")
}

export const getCompletedOrders = () => {
   return axios.get(MASTER_URL + "/findAllCompletedOrders")
}

export const getCancelledOrders = () => {
   return axios.get(MASTER_URL + "/findAllCancelledOrders")
}