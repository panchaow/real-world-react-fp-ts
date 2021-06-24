import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { SettingsForm, SettingsFormProps } from './SettingsForm';

export default {
  title: 'Components/SettingsForm',
  component: SettingsForm,
  argTypes: {
  },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>]
} as Meta;

const Template: Story<SettingsFormProps> = (args) => <SettingsForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onSubmit: action("submit")
}