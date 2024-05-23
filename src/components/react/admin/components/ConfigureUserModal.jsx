import {Button, Dropdown, MultiSelect, Select, SelectItem, TextInput} from "@carbon/react";

const ConfigureUserModal = ({ user }) => {
    return (
        <>
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
            {user?.['is_admin'] ? <Button kind='danger--ghost'>Demote from Staff</Button>
            : <Button kind='tertiary'>Promote to Staff</Button>}
            <Button kind='danger--tertiary'>Disable Account</Button>
            <Button kind='danger'>Delete Account</Button>
        </>
    )
}

export default ConfigureUserModal