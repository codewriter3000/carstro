import {
    Button,
    Column,
    Grid, Modal,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tag
} from '@carbon/react'
import users from 'public/users.json'
import {useRef, useState} from 'react'
import ConfigureUserModal from "@/components/react/admin/components/ConfigureUserModal.jsx";

const mockData = users.users

const getUserFromUsername = (username) => {
    const data = mockData.find(user => {
        return user.username === username
    })

    return data
}

const UsersPage = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState('')

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const changePaginationState = (pageInfo) => {
        if (page !== pageInfo.page) {
            setPage(pageInfo.page)
        }

        if (pageSize !== pageInfo.pageSize) {
            setPageSize(pageInfo.pageSize)
        }
    }

    return (
        <Grid className='h-screen'>
            <Column lg={16} md={8} sm={4}>
                <h1>Users</h1>
            </Column>
            <Column className='mt-4' lg={16} md={8} sm={4}>
                <Pagination
                    backwardText='Previous page'
                    forwardText='Next page'
                    itemsPerPageText='Items per page'
                    onChange={changePaginationState}
                    page={page}
                    pageSize={pageSize}
                    pageSizes={[10, 25, 50]}
                    size='md'
                    totalItems={mockData.length}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>
                                Last Name
                            </TableHeader>
                            <TableHeader>
                                First Name
                            </TableHeader>
                            <TableHeader>
                                Username
                            </TableHeader>
                            <TableHeader>
                                Actions
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.filter(user => {
                            return page * pageSize >= user['id'] && (page - 1) * pageSize < user['id']
                        }).map(user => {
                            return (
                                <TableRow key={user['id']}>
                                    <TableCell>{user['last_name']}</TableCell>
                                    <TableCell>{user['first_name']}</TableCell>
                                    <TableCell>
                                        {user['username']}
                                        {user['is_admin'] &&
                                            <>
                                                {' '}
                                                <Tag type='blue'>
                                                    Administrator
                                                </Tag>
                                            </>}
                                        {user['is_disabled'] &&
                                            <>
                                                {' '}
                                                <Tag type='red'>
                                                    Disabled
                                                </Tag>
                                            </>}
                                    </TableCell>
                                    <TableCell>
                                        <Button id={user['username']} kind='ghost'
                                        onClick={(event) => {
                                            event.preventDefault()

                                            setUser(event.target['id'])
                                            setOpen(true)
                                        }}>Configure</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Column>
            <Modal open={open}
                onRequestClose={() => setOpen(false)}
                modalHeading={`Configure ${user}`}
                modalLabel='User configuration'
                secondaryButtonText='Cancel'
                primaryButtonText='Save Changes'
            >
                <ConfigureUserModal user={getUserFromUsername(user)} />
            </Modal>
        </Grid>
    )
}

export default UsersPage