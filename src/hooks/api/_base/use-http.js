import { useAxios } from "./use-axios"
import { useGlobalUser } from "../../../context"

export function useHttp(baseURL, headers) {
  const instance = useAxios(baseURL, headers)
  const [,setUser] = useGlobalUser()  

  async function get(url) {
    
    try {
      const response = await instance.get(url)
  
      return response.data
    } catch (error) {
      if(error.response.status === 401) {
        setUser({})
        localStorage.removeItem('user')
      }
    }
  }

  async function post(url, data) {
    const response = await instance.post(url, data)

    return response.data
  }

  return {
    get,
    post
  }
}
