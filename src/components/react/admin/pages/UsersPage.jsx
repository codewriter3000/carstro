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
import {memo, useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react'
import ConfigureUserModal from '@/components/react/admin/components/ConfigureUserModal.jsx'
import NewUserModal from '@/components/react/admin/components/NewUserModal.jsx'
import {listUsers} from '@/../lib'

const mockData = users.users
// const realData = await listUsers()

const UsersPage = () => {
    const [configureOpen, setConfigureOpen] = useState(false)
    const [newOpen, setNewOpen] = useState(false)
    const [user, setUser] = useState('')

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const [searchString, setSearchString] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const [realData, setRealData] = useState([])

    useEffect(() => {
        listUsers().then(users => {
            setRealData(users)
        })
    }, [newOpen, configureOpen])

    const getUserFromUsername = useCallback((username) => {
        const user = realData.find(usr => usr[1] === username)

        return user ? {
            id: user[0],
            username: user[1],
            first_name: user[4],
            last_name: user[5],
            is_admin: user[6],
            is_enabled: user[7],
        } : undefined
    }, [user])

    const changePaginationState = (pageInfo) => {
        if (page !== pageInfo.page) {
            setPage(pageInfo.page)
        }

        if (pageSize !== pageInfo.pageSize) {
            setPageSize(pageInfo.pageSize)
        }
    }

    useEffect(() => {
        setSearchResults([...realData])

        if (searchString.length > 0) {
            setSearchResults(realData.filter(result => {
                const parsedResult = {
                    id: result[0],
                    username: result[1],
                    first_name: result[4],
                    last_name: result[5],
                    is_admin: result[6],
                }

                return parsedResult['username'].toLowerCase().includes(searchString.toLowerCase()) ||
                    parsedResult['first_name'].toLowerCase().includes(searchString.toLowerCase()) ||
                    parsedResult['last_name'].toLowerCase().includes(searchString.toLowerCase())
            }))
        }

        setPage(1)
    }, [searchString, realData])

    return (
        <Grid>
            <Column lg={16} md={8} sm={4}>
                <h1>Users</h1>
            </Column>
            <Column className='mt-4' lg={16} md={8} sm={4}>
                <Button onClick={() => setNewOpen(!newOpen)}>New User</Button>
                <NewUserModal open={newOpen} setOpen={setNewOpen} />
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
                            const parsedUser = {
                                id: user[0],
                                username: user[1],
                                first_name: user[4],
                                last_name: user[5],
                                is_admin: user[6],
                                is_enabled: user[7],
                            }

                            return (
                                <TableRow key={parsedUser['id']}>
                                    <TableCell>{parsedUser['last_name']}</TableCell>
                                    <TableCell>{parsedUser['first_name']}</TableCell>
                                    <TableCell>
                                        {parsedUser['username']}
                                        {parsedUser['is_admin'] &&
                                            <>
                                                {' '}
                                                <Tag type='blue'>
                                                    Administrator
                                                </Tag>
                                            </>}
                                        {parsedUser['is_enabled'] &&
                                            <>
                                                {' '}
                                                <Tag type='red'>
                                                    Disabled
                                                </Tag>
                                            </>}
                                    </TableCell>
                                    <TableCell>
                                        <Button id={parsedUser['username']} kind='ghost'
                                            onClick={(event) => {
                                                event.preventDefault()
                                                setUser(event.target['id'])
                                                setConfigureOpen(true)
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

            <ConfigureUserModal open={configureOpen} setOpen={setConfigureOpen} user={getUserFromUsername(user)} />
        </Grid>
    )
}

export default UsersPage