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
    HeaderSideNavItems,
} from '@carbon/react'
import { Switcher, Notification, UserAvatar } from '@carbon/icons-react'

import '@/styling/components/react/_application-header.scss'

const AdminHeader = () => (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="Carstro Admin">
                <SkipToContent />
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
                    <HeaderGlobalAction
                        aria-label="User Avatar"
                        tooltipAlignment="center"
                        className="action-icons"
                    >
                        <UserAvatar size={20} />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
        )}
    />
)

export default AdminHeader