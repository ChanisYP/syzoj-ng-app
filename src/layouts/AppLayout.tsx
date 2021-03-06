import React, { useState } from "react";
import { observer } from "mobx-react";
import { Link, useNavigation, useLoadingRoute } from "react-navi";
import { Menu, Button, Dropdown, Container, Icon, Segment, Sidebar, SemanticICONS } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "noty/lib/noty.css";
import "noty/lib/themes/semanticui.css";

import style from "./AppLayout.module.less";
import Logo from "@/assets/syzoj-applogo.svg";

import GlobalProgressBar from "@/components/GlobalProgressBar";

import { Locale } from "@/interfaces/Locale";
import localeMeta from "@/locales/meta";
import { appState } from "@/appState";
import { appConfig } from "@/appConfig";
import { useIntlMessage, useLoginOrRegisterNavigation } from "@/utils/hooks";
import toast from "@/utils/toast";
import { AuthApi } from "@/api";

let AppLayout: React.FC = props => {
  const navigation = useNavigation();
  const loadingRoute = useLoadingRoute();
  const _ = useIntlMessage();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  navigation.subscribe(route => {
    if (route.type === "ready") setSidebarOpen(false);
  });

  async function onLogoutClick() {
    const { requestError, response } = await AuthApi.logout();
    if (requestError) {
      toast.error(requestError);
    } else {
      appState.token = appState.currentUser = null;
      appState.currentUserPrivileges = [];
      appState.userPreference = {};
      navigation.refresh();
    }
  }

  const onLoginOrRegisterClick = useLoginOrRegisterNavigation();

  const navButtons: Record<string, { icon: SemanticICONS; text: string; url?: string }> = {
    home: {
      icon: "home",
      text: "common.navbar.home",
      url: "/"
    },
    problem_set: {
      icon: "book",
      text: "common.navbar.problem_set",
      url: "/problems"
    },
    contests: {
      icon: "calendar",
      text: "common.navbar.contests"
      // url: "/contests"
    },
    submissions: {
      icon: "hourglass",
      text: "common.navbar.submissions",
      url: "/submissions"
    },
    members: {
      icon: "users",
      text: "common.navbar.members",
      url: "/users"
    },
    discussion: {
      icon: "comments",
      text: "common.navbar.discussion"
      // url: "/discussion"
    }
  };

  const navMenuItems = Object.keys(navButtons).map(name => (
    <Menu.Item key={name} as={Link} href={navButtons[name].url}>
      <Icon name={navButtons[name].icon} />
      {_(navButtons[name].text)}
    </Menu.Item>
  ));

  const loginAndRegisterButtons = (
    <>
      <Button className={style.loginAndRegisterButton} onClick={() => onLoginOrRegisterClick("login")}>
        {_("common.header.user.login")}
      </Button>
      <Button
        className={style.loginAndRegisterButton}
        primary
        onClick={() => onLoginOrRegisterClick("register")}
        type="primary"
      >
        {_("common.header.user.register")}
      </Button>
    </>
  );

  const userMenu = (ContainerComponent: typeof Dropdown | typeof Menu) => (
    <>
      <ContainerComponent.Menu className={style.userMenu}>
        <ContainerComponent.Item as={Link} href={`/user/${appState.currentUser.id}`}>
          <Icon name="user" />
          {_("common.header.user.profile")}
        </ContainerComponent.Item>
        <ContainerComponent.Item
          as={Link}
          href={{ pathname: "/submissions", query: { submitter: appState.currentUser.username } }}
        >
          <Icon name="hourglass half" />
          {_("common.header.user.submissions")}
        </ContainerComponent.Item>
        <ContainerComponent.Item
          as={Link}
          href={{ pathname: "/problems", query: { ownerId: appState.currentUser.id } }}
        >
          <Icon name="book" />
          {_("common.header.user.problems")}
        </ContainerComponent.Item>
        {ContainerComponent === Dropdown && <Dropdown.Divider />}
        <ContainerComponent.Item as={Link} href={`/user/${appState.currentUser.id}/edit/profile`}>
          <Icon name="edit" />
          {_("common.header.user.edit_profile")}
        </ContainerComponent.Item>
        <ContainerComponent.Item as={Link} href={`/user/${appState.currentUser.id}/edit/preference`}>
          <Icon name="cog" />
          {_("common.header.user.preference")}
        </ContainerComponent.Item>
        <ContainerComponent.Item onClick={onLogoutClick}>
          <Icon name="power" />
          {_("common.header.user.logout")}
        </ContainerComponent.Item>
      </ContainerComponent.Menu>
    </>
  );

  const logo = (
    <Menu.Item as={Link} href="/" className={style.logoItem}>
      <div className={style.content}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.siteName}>{appConfig.siteName}</div>
      </div>
    </Menu.Item>
  );

  const footer = (
    <>
      <Segment vertical className={style.footer}>
        <Container textAlign="center">
          <div>
            {appConfig.siteName} Powered by{" "}
            <a href="https://github.com/syzoj" target="_blank">
              SYZOJ
            </a>
          </div>
          <div className={style.footerLinks}>
            <Link href="/judge-machine">{_("common.footer.judge_machine")}</Link>
          </div>
          <div className={style.languageSwitchContainer}>
            <Dropdown icon="language">
              <Dropdown.Menu className={style.languageSwitchMenu}>
                {Object.keys(localeMeta).map((locale: Locale) => (
                  <Dropdown.Item
                    key={locale}
                    onClick={() => {
                      appState.localLocale = locale;
                      navigation.refresh();
                    }}
                    flag={localeMeta[locale].flag}
                    text={localeMeta[locale].name}
                    value={locale}
                    selected={locale === appState.locale}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Segment>
    </>
  );

  const userDropdown = (icon: boolean = true) => (
    <Menu.Menu position="right">
      <div className="ui simple dropdown item">
        {appState.currentUser.username}
        {icon && <i className="dropdown icon"></i>}
        {userMenu(Dropdown)}
      </div>
    </Menu.Menu>
  );

  const topBarItemsForWideScreen = (
    <>
      {navMenuItems}
      {appState.currentUser ? (
        userDropdown()
      ) : (
        <Menu.Item className={style.userContainer}>{loginAndRegisterButtons}</Menu.Item>
      )}
    </>
  );

  const topBarItemsForNarrowScreen = (
    <Menu.Menu position="right">
      {appState.currentUser && userDropdown(false)}
      <Menu.Item icon="bars" onClick={() => setSidebarOpen(true)} />
    </Menu.Menu>
  );

  const wide = appState.isScreenWidthIn(1024, Infinity);

  return (
    <>
      <GlobalProgressBar isAnimating={!!loadingRoute} />
      <Sidebar.Pushable as="div" className={style.sidebarPushable}>
        <Sidebar
          as={Menu}
          className={style.sidebarMenu}
          animation="push"
          direction="right"
          onHide={() => setSidebarOpen(false)}
          vertical
          visible={sidebarOpen}
        >
          <Menu.Item className={style.siteName} as={Link} href="/">
            {appConfig.siteName}
          </Menu.Item>
          <Menu.Item>
            {appState.currentUser ? (
              <>
                <Menu.Header>{appState.currentUser.username}</Menu.Header>
                {userMenu(Menu)}
              </>
            ) : (
              <Button.Group fluid>{loginAndRegisterButtons}</Button.Group>
            )}
          </Menu.Item>
          {navMenuItems}
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpen} className={style.sidebarPusher}>
          <Menu borderless fixed="top" className={style.menu}>
            <Container id={style.mainMenuContainer}>
              {logo}
              {wide ? topBarItemsForWideScreen : topBarItemsForNarrowScreen}
            </Container>
          </Menu>
          <div className={style.appContentContainer} id="scrollView">
            <Container id={style.mainUiContainer}>{props.children}</Container>
            {footer}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

AppLayout = observer(AppLayout);

export default AppLayout;
