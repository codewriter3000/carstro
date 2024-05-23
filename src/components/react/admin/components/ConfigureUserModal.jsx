import {
    Accordion,
    AccordionItem,
    Button,
    Dropdown,
    MultiSelect,
    Select,
    SelectItem, Stack,
    TextInput,
    Toggle
} from '@carbon/react'
import {useState} from "react";

const ConfigureUserModal = ({ user }) => {
    const [isAdmin, setIsAdmin] = useState(user?.['admin'])
    const [isDisabled, setIsDisabled] = useState(user?.['isDisabled'])
    const [deleteStage, setDeleteStage] = useState('Delete Account')

    return (
        <Stack gap={7}>
            <p style={{
                marginBottom: '1rem'
            }}>
                This is where you can configure the user account status for a
                particular user. You can change information about a user, change
                their admin status, or even disable, enable, or delete their account.
            </p>
            <TextInput data-modal-primary-focus id="first-name"
                       labelText="First name"
                       defaultValue={user?.['first_name']}
            />
            <TextInput data-modal-primary-focus id="last-name"
                       labelText="Last name"
                       defaultValue={user?.['last_name']}

            />
            <div className='grid grid-cols-2'>
                <div>
                    <Toggle labelText='Is admin'
                            labelA='Standard user'
                            labelB='Admin user'
                            toggled={isAdmin}
                            onClick={() => setIsAdmin(curr => !curr)}
                    />
                </div>
                <div>
                    <Toggle labelText='Is account disabled'
                            labelA='Enabled account'
                            labelB='Disabled account'
                            toggled={isDisabled}
                            onClick={(tog) => {
                                setIsDisabled(curr => !curr)
                                console.log(tog)
                            }}
                    />
                </div>
            </div>
            <Accordion>
                <AccordionItem title='Delete Account'>
                    <div className='flex'>
                        <div>
                            <Button kind='danger'
                                    onClick={() => setDeleteStage('Confirm Delete')}>
                                {deleteStage}
                            </Button>
                        </div>
                        {deleteStage === 'Confirm Delete' && <div className='m-auto'>
                            Are you sure you want to delete this account?
                        </div>}
                    </div>
                </AccordionItem>
            </Accordion>
        </Stack>
    )
}

export default ConfigureUserModal