import React from "react";
import './index.css'

/**
 * 全局底部栏组件
 * @constructor
 */


export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();
    return (
        <div
            className="global-footer"
        >
            <div>© {currentYear} 面试猫</div>
            <div>
                <a href="https://www.muxuetianyin.cn" target="_blank" rel="noopener noreferrer">
                    muxuetianyin-苏永儿
                </a>
            </div>
        </div>
    );
}
