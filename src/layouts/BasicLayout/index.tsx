"use client"
import {GithubFilled, InfoCircleFilled, LogoutOutlined, QuestionCircleFilled, SearchOutlined,} from '@ant-design/icons';
import {ProConfigProvider, ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input, message, theme,} from 'antd';
import React from 'react';
import {Props} from "next/script";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css"
import {menus} from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {DEFAULT_USER} from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

export default function BasicLayout({children}: Props): React.ReactElement {

    const pathname = usePathname()

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();
    /**
     * 注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingPost();
            // 保存用户登录态
            dispatch(setLoginUser(DEFAULT_USER));
            router.push("/");
        } catch (e: any) {
            message.error('登录失败，' + e.message);
        }
    };


    return (
        <div
            id="layout-page"
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
                        src: loginUser.userAvatar || "/assets/defaultUserAvatar.png",
                        size: "small",
                        title: loginUser.userName || "进步猫",
                        render: (props, dom) => {
                            return loginUser.id ? (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "logout",
                                                icon: <LogoutOutlined />,
                                                label: "退出登录",
                                            },
                                        ],
                                        onClick:( async (event:{key:React.Key})=>{
                                            const { key } =event
                                            if (key === "logout") userLogout()
                                        })
                                    }}

                                >
                                    {dom}
                                </Dropdown>
                            ) : (
                                <div onClick={() => router.push("/user/login")}>{dom}</div>
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
