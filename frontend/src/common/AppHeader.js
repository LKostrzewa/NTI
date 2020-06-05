import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import {DownOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {getAvatarColor} from "../utils/Colors";

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <HomeOutlined className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/registration">
                    <Link to="/registration">Sign up</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Insta App</Link>
                    </div>
                    {this.props.currentUser !== null ?
                        <>
                            <div className="app-title">
                                <Link to="/postList">Post list</Link>
                            </div>
                            <div className="app-title">
                                <Link to="/forum"> Forum </Link>
                            </div>
                        </>
                        : null}

                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-details">
                    <div className="user-avatar">
                        <Avatar className="user-avatar-circle"
                                style={{backgroundColor: getAvatarColor(props.currentUser.firstName)}}>
                            {props.currentUser.firstName[0].toUpperCase()}
                        </Avatar>
                    </div>
                    <div className="user-summary">
                        <div className="full-name">
                            {props.currentUser.firstName + ' ' + props.currentUser.lastName}
                        </div>
                        <div className="username">
                            @{props.currentUser.username}
                        </div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/my-profile`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <UserOutlined className="nav-icon" style={{marginRight: 0}}/> <DownOutlined/>
            </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);