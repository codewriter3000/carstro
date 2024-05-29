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
    HeaderSideNavItems, Popover, PopoverContent, Button,
} from '@carbon/react'
import {Switcher, Notification, UserAvatar} from '@carbon/icons-react'

import '@/styling/components/react/_application-header.scss'
import {useState} from "react";

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
                    <a href="/admin/dashboard">
                        <HeaderName prefix="Carstro">Admin Panel</HeaderName>
                    </a>
                    <HeaderNavigation aria-label="Users">
                        <a href="/admin/users">
                            <HeaderMenuItem>Users</HeaderMenuItem>
                        </a>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <a href="/admin/users">
                                    <HeaderMenuItem>Users</HeaderMenuItem>
                                </a>
                            </HeaderSideNavItems>
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
                                <Button kind='ghost'>Logout</Button>
                            </PopoverContent>
                        </Popover>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    )
}

export default AdminHeader