import {MenuDataItem} from "@umijs/route-utils";
import {CrownOutlined} from "@ant-design/icons";

// 菜单列表
export const menus = [
    {
        path: '/',
        name: '主页'
    },
    {
        path: 'questions',
        name: '题目'
    },
    {
        path: 'banks',
        name: '题库'
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined />,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
            }
        ],
    },
] as MenuDataItem[];
