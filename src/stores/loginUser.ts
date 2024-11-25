import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {DEFAULT_USER} from "@/constants/user";
// import { RootState } from "@/stores/index";



/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: DEFAULT_USER,
    reducers: {
        // 自定义全局状态名称 : (state, action) =>
        setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
            // action.payload 传入的值
            return {
                ...action.payload,
            };
        },
    },
});

// 修改状态
export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
