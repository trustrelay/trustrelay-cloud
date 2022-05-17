import React, { useEffect, useState, FunctionComponent } from "react";
import { Avatar, makeStyles, Theme, withStyles,  useMediaQuery, AvatarProps } from "@material-ui/core";



type CustomAvatarProps = AvatarProps & {
    backgroundColor: string;
    iconColor:string;
  };

const CustomAvatar = ({backgroundColor, iconColor, ...props}:CustomAvatarProps) =>
{

    const smDown = !useMediaQuery('(min-width:600px)');
    const lgUp = useMediaQuery('(min-width:1000px)');

    const getIconSize = () => {
        if (smDown) return "30px";
        if (lgUp) return "50px";
        return "40px";
    }

return <Avatar sx={{width:getIconSize(), height:getIconSize(), bgcolor:backgroundColor, color:iconColor}} variant="rounded">{props.children}</Avatar>
}

export default CustomAvatar;