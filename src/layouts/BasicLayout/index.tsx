"use client"
import {GithubFilled, InfoCircleFilled, LogoutOutlined, QuestionCircleFilled, SearchOutlined,} from '@ant-design/icons';
import {ProConfigProvider, ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input, theme,} from 'antd';
import React from 'react';
import {Props} from "next/script";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css"
import {menus} from "../../../config/menu";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";

const SearchInput = () => {
    const {token} = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder="搜索方案"
                variant="borderless"
            />
        </div>
    );
};

export default function BasicLayout({children}: Props): React.ReactElement {

    const pathname = usePathname()

    const loginUser = useSelector((state: RootState) => state.loginUser);


    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ProLayout
                    prefixCls="my-prefix"
                    location={{
                        pathname,
                    }}
                    token={{
                        header: {
                            // colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            colorBgMenuItemHover: 'rgba(0,0,0,0.0)',
                            colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
                            colorTextMenuActive: 'rgba(213,213,213,0.95)',
                        },
                    }}
                    layout={'top'}
                    title={"面试刷题平台"}
                    logo={
                        <Image src="/assets/logo.png" width={32} height={32} alt={"muxuetianyin-刷题网站"}/>
                    }
                    siderMenuType="group"
                    menu={{
                        collapsedShowGroupTitle: true,
                    }}
                    fixedHeader={true}
                    avatarProps={{
                        src: loginUser.userAvatar,
                        size: 'small',
                        title: loginUser.userName,
                        render: (props, dom) => {
                            return (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: 'logout',
                                                icon: <LogoutOutlined/>,
                                                label: '退出登录',
                                            },
                                        ],
                                    }}
                                >
                                    {dom}
                                </Dropdown>
                            );
                        },
                    }}
                    actionsRender={(props) => {
                        if (props.isMobile) return [];
                        return [
                            props.layout !== 'side'  ? (
                                <SearchInput/>
                            ) : undefined,
                            <InfoCircleFilled key="InfoCircleFilled"/>,
                            <QuestionCircleFilled key="QuestionCircleFilled"/>,
                            <GithubFilled key="GithubFilled"/>,
                        ];
                    }}
                    headerTitleRender={(logo, title) => {
                        return (
                            <a>
                                {logo}
                                {title}
                            </a>
                        );
                    }}
                    footerRender={() => {
                        return (
                            <GlobalFooter/>
                        );
                    }}
                    onMenuHeaderClick={(e) => console.log(e)}
                    menuDataRender={() => {
                        return getAccessibleMenus(loginUser,menus);
                    }}
                    menuItemRender={(item, dom) => (
                        <Link
                            href={item.path || "/"}
                            target={item.target}
                        >
                            {dom}
                        </Link>
                    )}
                >
                    {children}
                </ProLayout>
            </ProConfigProvider>
        </div>

    );
};
