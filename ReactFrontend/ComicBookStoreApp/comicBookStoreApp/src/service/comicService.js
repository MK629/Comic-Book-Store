import axios from 'axios'
import { getLoggedInUser } from './authService'


const MASTER_URL = "http://localhost:8090/rest/comics"

export const getHotComics = () => {
   return axios.get(MASTER_URL + "/findHot")
}

export const getAllComics = () => {
   return axios.get(MASTER_URL + "/findAll")
}

export const searchById = (key) => {
   return axios.get(MASTER_URL + "/findById/" + key)
}

export const search = (key) => {
   return axios.get(MASTER_URL + "/findByAny/" + key)
}

export const sendOrder = (orderSender) => {
   return axios.post(MASTER_URL + "/order", orderSender)
}

export const getAllOrders = () => {
   return axios.get(MASTER_URL + "/findAllOrders/" + getLoggedInUser())
}

export const getOngoingOrders = () => {
   return axios.get(MASTER_URL + "/findOngoingOrders/" + getLoggedInUser())
}

export const getCompletedOrders = () => {
   return axios.get(MASTER_URL + "/findCompletedOrders/" + getLoggedInUser())
}

export const getCancelledOrders = () => {
   return axios.get(MASTER_URL + "/findCancelledOrders/" + getLoggedInUser())
}

export const cancelOrder = (orderId) => {
   return axios.get(MASTER_URL + "/cancelOrder/" + orderId)
}