/*
    ButtonAgain对Button的二次封装：
        解决问题：点击按钮，在异步操作中的一种函数防抖（例如：避免重复点击提交数据请求）
        点击按钮做啥事，一定要基于onClick处理！！

*/
import React, { useState } from "react";
import { Button } from "antd-mobile";

const ButtonAgain = function ButtonAgain(props:any) {
    let options = { ...props },
        [loading, setLoading] = useState(false)
    let { children, onClick: handle } = options
    delete options.children

    const handleClick = async () => {
        setLoading(true)
        try {
            await handle()
        } catch (_) { }
        setLoading(false)
    }

    if (handle) {
        options.onClick = handleClick
    }


    return <Button {...options} loading={loading}>{children}</Button>
}

export default ButtonAgain