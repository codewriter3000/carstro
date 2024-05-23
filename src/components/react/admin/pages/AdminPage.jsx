import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Column,
    Grid,
    Layer,
    Tab, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Tag
} from '@carbon/react'
import CountUp, { useCountUp } from 'react-countup'
import users from 'public/users.json'

const mockData = users.users

export default function LandingPage() {
    useCountUp({
        ref: 'users',
        end: 347
    })

    useCountUp({
        ref: 'administrators',
        end: 5
    })

    useCountUp({
        ref: 'disabled',
        end: 2
    })

    return (
        <Grid className="dashboard-page h-screen" fullWidth>
            <Column lg={16} md={8} sm={4} className="dashboard-page__banner">
                <h1>Admin Dashboard</h1>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    <div>
                        <h2>
                            <span id='users'/>
                        </h2>
                        <p>Users</p>
                    </div>
                    <div>
                        <h2>
                            <span id='administrators'/>
                        </h2>
                        <p>Administrators</p>
                    </div>
                    <div>
                        <h2>
                            <span id='disabled'/>
                        </h2>
                        <p>Disabled</p>
                    </div>
                </div>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <h2>Administrators</h2>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.filter(user => user['is_admin']).map(user => {
                            return (
                                <TableRow key={user['id']}>
                                    <TableCell>{user['last_name']}</TableCell>
                                    <TableCell>{user['first_name']}</TableCell>
                                    <TableCell>
                                        {user['username']}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <h2>Disabled</h2>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.filter(user => user['is_disabled']).map(user => {
                            return (
                                <TableRow key={user['id']}>
                                    <TableCell>{user['last_name']}</TableCell>
                                    <TableCell>{user['first_name']}</TableCell>
                                    <TableCell>
                                        {user['username']}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Column>
        </Grid>
    );
}