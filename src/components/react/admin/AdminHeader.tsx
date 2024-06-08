import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems, Popover, PopoverContent, Button, SideNavLink,
} from '@carbon/react'
import {Switcher, Notification, UserAvatar} from '@carbon/icons-react'

import '@/styling/components/react/_application-header.scss'
import { useState } from 'react'
import { logoutUser } from '@/../lib/user.ts'
import {redirect} from "../../../../lib";

const AdminHeader = () => {
    const [userPopoverOpen, setUserPopoverOpen] = useState(false)

    return (
        <HeaderContainer
            render={({isSideNavExpanded, onClickSideNavExpand}) => (
                <Header aria-label="Carstro Admin">
                    <SkipToContent/>
                    <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName href="/admin/dashboard" prefix="Carstro">
                        Admin Panel
                    </HeaderName>
                    <HeaderNavigation aria-label="Users">
                            <HeaderMenuItem href="/admin/users">
                                Users
                            </HeaderMenuItem>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            <SideNavLink href="/admin/users">
                                Users
                            </SideNavLink>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar className='mr-8'>
                        <Popover open={userPopoverOpen}>
                            <HeaderGlobalAction
                                aria-label="User Avatar"
                                tooltipAlignment="center"
                                className="action-icons"
                                onClick={() => {
                                    setUserPopoverOpen(!userPopoverOpen)
                                }}
                            >
                                <UserAvatar size={20}/>
                            </HeaderGlobalAction>
                            <PopoverContent>
                                <Button kind='ghost' onClick={async() => {
                                    await logoutUser()
                                    redirect('/admin/login')
                                }}>Logout</Button>
                            </PopoverContent>
                        </Popover>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    )
}

export default AdminHeader