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

const ApplicationHeader = () => (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label='Carbon Boilerplate Template'>
                <SkipToContent />
                <HeaderMenuButton
                    aria-label='Open menu'
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />
                <HeaderName href='/' prefix='IBM'>
                    Carbon Tutorial
                </HeaderName>
                <HeaderNavigation aria-label='Carbon Boilerplate Template'>
                    <HeaderMenuItem href='/repos'>Repositories</HeaderMenuItem>
                </HeaderNavigation>
                <SideNav
                    aria-label='Side navigation'
                    expanded={isSideNavExpanded}
                    isPersistent={false}
                >
                    <SideNavItems>
                        <HeaderSideNavItems>
                            <a href='/repos'>
                                <HeaderMenuItem href='/repos'>Repositories</HeaderMenuItem>
                            </a>
                        </HeaderSideNavItems>
                    </SideNavItems>
                </SideNav>
                <HeaderGlobalBar>
                    <HeaderGlobalAction
                        aria-label="Notifications"
                        tooltipAlignment="center"
                        className="action-icons"
                    >
                        <Notification size={20} />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
        )}
    />
)

export default ApplicationHeader