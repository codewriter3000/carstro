import {Form, Grid, TextInput, Tile} from '@carbon/react'

const LoginPage = () => {
    return (
        <Grid className='login-page' fullWidth>
            <Tile>
                <Form>
                    <TextInput labelText='Email' id='email' />
                </Form>
            </Tile>
        </Grid>
    )
}

export default LoginPage