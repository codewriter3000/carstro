import api from './api'
import type { AxiosResponse } from 'axios'

const getServerStatus = async (): Promise<string> => {
    let status: string = 'offline'

    try {
        const res: AxiosResponse<any, any> = await api.get('/status')

        if (res.data['status'] === 'online') {
            status = 'online'
        }
    } catch (error) {
        console.error('Server is offline')
        console.error(error)
    }

    return status
}

export { getServerStatus }