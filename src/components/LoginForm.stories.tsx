import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LoginForm, LoginFormProps } from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  argTypes: {
  },
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onSubmit: action("submit")
}