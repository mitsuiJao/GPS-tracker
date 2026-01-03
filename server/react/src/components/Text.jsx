import React from "react";

// propsオブジェクトのchildrenのみを抜き取る
// props.children等価
function Text({ children }) {
    const style = {
        fontSize: "14px",
    }
    return (
        <p style={style}>{children}</p>
    );
}

export default Text;