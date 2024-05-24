import {
    Button,
    Column,
    Grid,
    Pagination,
    Search,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tag
} from '@carbon/react'
import users from 'public/users.json'
import { useEffect, useState } from 'react'
import ConfigureUserModal from '@/components/react/admin/components/ConfigureUserModal.jsx'

const mockData = users.users

const getUserFromUsername = (username) => {
    return mockData.find(user => user.username === username)
}

const UsersPage = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState('')

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const [searchString, setSearchString] = useState('')
    const [searchResults, setSearchResults] = useState([...mockData])

    const changePaginationState = (pageInfo) => {
        if (page !== pageInfo.page) {
            setPage(pageInfo.page)
        }

        if (pageSize !== pageInfo.pageSize) {
            setPageSize(pageInfo.pageSize)
        }
    }

    useEffect(() => {
        setSearchResults(mockData.filter(result => {
            return result['username'].toLowerCase().includes(searchString.toLowerCase()) ||
                result['first_name'].toLowerCase().includes(searchString.toLowerCase()) ||
                result['last_name'].toLowerCase().includes(searchString.toLowerCase())
        }))

        setPage(1)
    }, [searchString])

    return (
        <Grid>
            <Column lg={16} md={8} sm={4}>
                <h1>Users</h1>
            </Column>
            <Column className='mt-4' lg={16} md={8} sm={4}>
                <Search
                    size='lg'
                    placeholder='Find a user'
                    labelText='Search'
                    id='user-search'
                    onChange={evt => setSearchString(evt.target.value)}
                />
                <Pagination
                    backwardText='Previous page'
                    forwardText='Next page'
                    itemsPerPageText='Items per page'
                    onChange={changePaginationState}
                    page={page}
                    pageSize={pageSize}
                    pageSizes={[10, 25, 50]}
                    size='md'
                    totalItems={searchResults.length}
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
                        {searchResults.filter(user => {
                            return page * pageSize > searchResults.indexOf(user) && (page - 1) * pageSize <= searchResults.indexOf(user)
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
                                            }}
                                        >
                                            Configure
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Column>
            <ConfigureUserModal open={open} setOpen={setOpen} user={getUserFromUsername(user)} />
        </Grid>
    )
}

export default UsersPage