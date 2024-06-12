import api from './api'
import type { AxiosResponse } from 'axios'

const registerUser = async ({username, password, first_name, last_name, is_admin, is_enabled}:
                                {
                                    username: string,
                                    password: string,
                                    first_name: string,
                                    last_name: string,
                                    is_admin: string,
                                    is_enabled: string
                                }): Promise<object> => {
    try {
        const token = localStorage.getItem('token')
        const res: AxiosResponse<any, any> = await api.post('/user/create', {
            username, password, first_name, last_name, is_admin, is_enabled
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const listUsers = async (): Promise<object[]> => {
    try {
        const token = localStorage.getItem('token')
        const res: AxiosResponse = await api.get('/users/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        console.log(error)
        return error
    }
}

const updateUser = async (user_id: number, {username, first_name, last_name, is_admin, is_enabled}:
                            {
                                username: string,
                                first_name: string,
                                last_name: string,
                                is_admin: boolean,
                                is_enabled: boolean
                            }): Promise<object[]> => {
    try {
        const token = localStorage.getItem('token')
        const res: AxiosResponse = await api.put(`/users/${user_id}`, {
        username, first_name, last_name, is_admin, is_enabled
    }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const deleteUser = async (user_id: number): Promise<object[]> => {
    try {
        const token = localStorage.getItem('token')
        const res: AxiosResponse = await api.delete(`/users/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const loginUser = async ({username, password}: {username: string, password: string}): Promise<object> => {
    try {
        const res: AxiosResponse = await api.post('/user/login', {
            username: username,
            password: password
        }, {
            withCredentials: true
        })

        if (localStorage) {
            console.log(JSON.stringify(res.data['token']))
            localStorage.setItem('token', res.data['token']['token'])
        }

        return res.data['token']
    } catch (error) {

        // @ts-ignore
        return {'error': 401, 'message': error.response.data.detail}
    }
}

// @ts-ignore
const logoutUser = async (): Promise<object> => {
    try {
        const res: AxiosResponse = await api.post('/user/logout', {}, {
            withCredentials: true
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const isAdmin = async (token: string): Promise<object> => {
    try {
        const res: AxiosResponse = await api.get('/admin/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res.data['is_admin'] === true) {
            return {'is_admin': true}
        } else {
            return {'is_admin': false, 'message': res.data['message']}
        }
    } catch(error: any) {
        return {'is_admin': false, 'message': error.response.data.detail}
    }
}

export { registerUser, listUsers, updateUser, deleteUser, loginUser, logoutUser, isAdmin }