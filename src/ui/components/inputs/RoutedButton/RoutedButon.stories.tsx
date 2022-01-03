import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import RoutedButton from './RoutedButton'

export default {
    title: 'inputs/RoutedButton',
    component: RoutedButton
}as ComponentMeta<typeof RoutedButton>

const Template: ComponentStory<typeof RoutedButton> = (args) => (
    <RoutedButton {...args}>Clique aqui</RoutedButton>
)

export const Default = Template.bind({})
Default.args = {
    variant: 'contained'
}

