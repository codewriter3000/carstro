import {Button, Form, FlexGrid, TextInput, Theme, Tile, PasswordInput, Stack} from '@carbon/react'
import React from 'react'

const LoginPage = () => {
    return (
        <Theme theme='g100' className='login-page'>
            <div className='login-frame'>
                <FlexGrid>
                    <Tile>
                        <Form className='login-form'>
                            <Stack gap={7}>
                                <TextInput labelText='Username' id='username' />
                                <PasswordInput labelText='Password' id='password' />
                                <Button>Login</Button>
                            </Stack>
                        </Form>
                    </Tile>
                </FlexGrid>
            </div>
        </Theme>
    )
}

export default LoginPage