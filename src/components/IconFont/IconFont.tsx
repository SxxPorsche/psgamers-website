import React from "react";
import "./index.css";

interface IconFontProps {
    unicode: string;
}

class IconFont extends React.Component<IconFontProps>{
    render () {
        return (<i className="iconfont">{this.props.unicode}</i>)
    }
}

export default IconFont;