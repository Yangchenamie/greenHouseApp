import React from "react";
import { Tag } from "tdesign-react";
const TagAction = function TagAction(props: any) {
  let options = {...props},
    {children,icon,closable,onClick:handleClick,onClose:handleClose} = options;
  delete options.children;

  if(handleClick){
    options.onClick = handleClick
  }
  if(handleClose){
    options.onClick = handleClose
  }


  return (
    <Tag
      style={{
        marginRight: 7,
        marginBottom: 7,
        color: "#FFFFFF",
        background: "#93CCB5",
        padding: "10px 8px",
        borderRadius: "8px",
        fontSize: 14,
      }}
      icon={icon}
      closable = {closable?closable:null}
      {...options}
    >
      {children}
    </Tag>
  );
};

export default TagAction;
