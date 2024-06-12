import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Column,
    // ErrorBoundary,
    ErrorBoundaryContext,
    Grid,
    Layer,
    Tab, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Tag
} from '@carbon/react'
import CountUp, { useCountUp } from 'react-countup'
import {useEffect, useRef, useState} from 'react'
import { listUsers } from '@/../lib'

export default function LandingPage() {
    const [realData, setRealData] = useState([])
    const [admins, setAdmins] = useState([])
    const [disabledUsers, setDisabledUsers] = useState([])
    const [isLoaded, _] = useState(true)
    const [shouldThrowError, setShouldThrowError] = useState(false)

    useEffect(() => {
        listUsers().then(users => {
            setRealData(users)
        }).catch(err => {
            console.log(JSON.stringify(err))
            setShouldThrowError(true)
        })
        userCountUp.update(realData.length)
    }, [isLoaded])

    useEffect(() => {
        setAdmins(realData.filter(user => user[6]))
        setDisabledUsers(realData.filter(user => !user[7]))
        adminCountUp.update(admins.length)
        disabledCountUp.update(disabledUsers.length)
    }, [realData])

    const userCountUpRef = useRef(null)
    const adminCountUpRef = useRef(null)
    const disabledCountUpRef = useRef(null)

    const userCountUp = useCountUp({
        ref: userCountUpRef,
        end: realData.length
    })

    const adminCountUp = useCountUp({
        ref: adminCountUpRef,
        end: admins.length
    })

    const disabledCountUp = useCountUp({
        ref: disabledCountUpRef,
        end: disabledUsers.length
    })

    const ThrowError = (shouldThrowError) => {
        if (shouldThrowError) {
            //throw new Error('Trying to get around this error by rendering a fallback using an IBM carbon component')
        }
    }

    const ErrorBoundary = ({ trigger, fallback, children }) => {
        if (trigger) {
            console.log('fallback')
            return fallback
        } else {
            return children
        }
    }

    return (
        <>
            <ErrorBoundary trigger={shouldThrowError} fallback={<h1>An error has occurred</h1>}>
                {/*<ThrowError shouldThrowError={throwError} />*/}
                <Grid className="dashboard-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="dashboard-page__banner">
                        <h1>Admin Dashboard</h1>
                    </Column>
                    <Column className='mt-6 mb-4' lg={16} md={8} sm={4}>
                        <div className='grid grid-cols-3 gap-4 mt-4'>
                            <div>
                                <h2 className='metric'>
                                    <span ref={userCountUpRef} />
                                </h2>
                                <p>Users</p>
                            </div>
                            <div>
                                <h2 className='metric'>
                                    <span ref={adminCountUpRef} />
                                </h2>
                                <p>Administrators</p>
                            </div>
                            <div>
                                <h2 className='metric'>
                                    <span ref={disabledCountUpRef} />
                                </h2>
                                <p>Disabled</p>
                            </div>
                        </div>
                    </Column>
                    <Column className='mt-6 mb-4' lg={16} md={8} sm={4}>
                        <h2 className='mb-2'>Administrators</h2>
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
                                {admins.map(user => {
                                    return (
                                        <TableRow key={user[0]}>
                                            <TableCell>{user[5]}</TableCell>
                                            <TableCell>{user[4]}</TableCell>
                                            <TableCell>
                                                {user[1]}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Column>
                    <Column className='mt-6 mb-4' lg={16} md={8} sm={4}>
                        <h2 className='mb-2'>Disabled</h2>
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
                                {disabledUsers.map(user => {
                                    return (
                                        <TableRow key={user[0]}>
                                            <TableCell>{user[5]}</TableCell>
                                            <TableCell>{user[4]}</TableCell>
                                            <TableCell>
                                                {user[1]}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Column>
                </Grid>
            </ErrorBoundary>
        </>
    );
}