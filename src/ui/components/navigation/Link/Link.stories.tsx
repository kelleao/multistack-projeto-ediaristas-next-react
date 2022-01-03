import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Link from "./Link"
import { types } from "@storybook/addons"

export default{
    title: 'navigation/Link',
    component: Link,

}as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => (
    <Link {...args}></Link>
)

export const Default = Template.bind({})
Default.args = {
    children: 'Clique aqui',
    href: '/#',
}