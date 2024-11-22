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
                            colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
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
                    avatarProps={{
                        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                        size: 'small',
                        title: '七妮妮',
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
                        // if (typeof window === 'undefined') return [];
                        return [
                            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                <SearchInput/>
                            ) : undefined,
                            <InfoCircleFilled key="InfoCircleFilled"/>,
                            <QuestionCircleFilled key="QuestionCircleFilled"/>,
                            <GithubFilled key="GithubFilled"/>,
                        ];
                    }}
                    headerTitleRender={(logo, title) => {
                        const defaultDom = (
                            <a>
                                {logo}
                                {title}
                            </a>
                        );
                        // if (typeof window === 'undefined') return defaultDom;
                        // if (document.body.clientWidth < 1400) {
                        //     return defaultDom;
                        // }
                        // if (_.isMobile) return defaultDom;
                        return (
                            <>
                                {defaultDom}
                            </>
                        );
                    }}
                    footerRender={() => {
                        return (
                           <GlobalFooter/>
                        );
                    }}
                    onMenuHeaderClick={(e) => console.log(e)}
                    menuDataRender={() => {
                        return menus
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