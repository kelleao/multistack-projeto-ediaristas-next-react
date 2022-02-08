import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumd from './Breadcrumd';

export default {
    title: 'navigation/Breadcrumd',
    component: Breadcrumd,
    argTypes: {},
} as ComponentMeta<typeof Breadcrumd>;

const Template: ComponentStory<typeof Breadcrumd> = (args) => (
    <Breadcrumd {...args} />
);

export const Default = Template.bind({});
Default.args = {
    selected: 'Identificação',
    items: ['Detalhes', 'Identificação', 'Pagamento'],
};