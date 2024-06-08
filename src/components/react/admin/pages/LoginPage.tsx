import { Button, Form, FlexGrid, TextInput, Theme, Tile, PasswordInput, Stack, Column } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react'
import React, {useRef, useState} from 'react'
import {isAdmin, loginUser} from '@/../lib/user.ts'
import {redirect} from '@/../lib'

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const username: React.MutableRefObject<null>  = useRef(null)
    const password: React.MutableRefObject<null> = useRef(null)

    return (
        <Theme theme='g100' className='login-page'>
            <div className='login-frame'>
                <FlexGrid>
                    <Tile>
                        <div className='m-4'>
                            <Column className='mb-12'>
                                <h1 className='mb-0'>Admin Log in</h1>
                                <p className='mt-1'>Need an admin account? Contact an administrator.</p>
                            </Column>
                            <Column>
                                <Form className='login-form'>
                                    <Stack gap={7}>
                                        {errorMessage.length > 0 && <p className='error'>{errorMessage}</p>}
                                        <TextInput ref={username} className='w-96' labelText='Username' id='username'/>
                                        <PasswordInput ref={password} labelText='Password' id='password'/>
                                        <Button className='w-96' renderIcon={ArrowRight} onClick={async() => {
                                            // @ts-ignore
                                            const token = (await loginUser({
                                                username: username.current['value'],
                                                password: password.current['value']}))['token']
                                            // @ts-ignore
                                            if (token) {
                                                const userIsAdmin = await isAdmin(token)
                                                if (userIsAdmin['is_admin']) {
                                                    console.log('Login successful')
                                                    redirect('/admin/dashboard')
                                                } else {
                                                    console.log(JSON.stringify(userIsAdmin))
                                                    setErrorMessage(userIsAdmin['message'])
                                                }
                                            }
                                        }}>Log in</Button>
                                    </Stack>
                                </Form>
                            </Column>
                        </div>
                    </Tile>
                </FlexGrid>
            </div>
        </Theme>
    )
}

export default LoginPage