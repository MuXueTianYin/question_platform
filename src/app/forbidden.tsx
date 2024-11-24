import {Button, Result} from "antd";


/**
 * 无权限访问的页面
 * @constructor
 */


const Forbidden = () =>{
    return (
        <Result
        status="403"
        title="403"
        subTitle="抱歉,你无权访问此页面"
        extra={
            <Button type="primary" href="/" >
            返回首页
            </Button>
        }
        ></Result>
    )
}

export default Forbidden