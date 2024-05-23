import { Button, Form, FlexGrid, TextInput, Theme, Tile, PasswordInput, Stack, Column } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react'
import React from 'react'

const LoginPage = () => {
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
                                        <TextInput className='w-96' labelText='Username' id='username'/>
                                        <PasswordInput labelText='Password' id='password'/>
                                        <Button className='w-96' renderIcon={ArrowRight}>Log in</Button>
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