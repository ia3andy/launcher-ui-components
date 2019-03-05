import {
  Brand,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Page,
  PageHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import logo from './assets/logo/RHD-logo.svg';
import style from './layout.module.scss';
import { useAuthApi } from 'keycloak-react';

export function Layout(props: { children: React.ReactNode }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const auth = useAuthApi();
  const userDropdownItems = [
    <DropdownItem onClick={auth.logout} key="logout">Logout</DropdownItem>,
  ];
  const PageToolbar = auth.user && (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Dropdown
            isPlain
            position="right"
            onSelect={() => setIsUserDropdownOpen((prev) => !prev)}
            isOpen={isUserDropdownOpen}
            toggle={<DropdownToggle onToggle={setIsUserDropdownOpen}>{auth.user.userPreferredName}</DropdownToggle>}
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );

  const Header = (
    <PageHeader
      logo={<Brand src={logo} alt="Red Hat" className={style.brand}/>}
      toolbar={PageToolbar}
      className={style.header}
    />
  );

  return (
    <React.Fragment>
      <Page header={Header}>
        {props.children}
      </Page>
    </React.Fragment>
  );
}
