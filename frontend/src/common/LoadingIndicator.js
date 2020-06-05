import React from "react";
import {Spin} from "antd";
import {Loading3QuartersOutlined} from "@ant-design/icons"

export default function LoadingIndicator() {
    const antIcon = <Loading3QuartersOutlined style={{fontSize: 100}} spin/>;
    return (
        <Spin indicator={antIcon} style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
        }}/>
    );
}