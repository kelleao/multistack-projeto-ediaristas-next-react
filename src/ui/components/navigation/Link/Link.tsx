import React from "react"
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import Router from 'next/router'
import {Link as MuiLink, LinkProps as MuiLinkProps, ButtonProps} from '@material-ui/core'

export interface LinkProps{
    href: string
    mui?:MuiLinkProps | ButtonProps
    next?:NextLinkProps
    Component?: React.ElementType
    onClick?: () => void
}

const Link: React.FC<LinkProps> = ({ 
    children, 
    href, 
    mui, 
    next, 
    Component = MuiLink, 
    ...props 
}) => {

    const isNextEnv = Boolean(Router.router)

    return isNextEnv ? ( 
        <NextLink href={href} passHref {...next}>
            <Component {...mui} {...props}>
                {children}
            </Component>
        </NextLink>
    ) : (
        <Component {...mui} {...props} href={href}>
            {children}
        </Component>
    )
}

export default Link