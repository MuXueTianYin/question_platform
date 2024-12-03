import {Input} from "antd";
import "./index.css";
import React from "react";
import {useRouter} from "next/navigation";

interface Props {

}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const SearchInput = () => {
    const router = useRouter();

    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
            }}
        >
            <Input.Search
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                placeholder="搜索题目"
                onSearch={(value) => {
                    router.push(`/questions?q=${value}`);
                }}
            />
        </div>
    );
};

export default SearchInput;
