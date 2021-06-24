import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RegisterForm, RegisterFormProps } from './RegisterForm';

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  argTypes: {
  },
} as Meta;

const Template: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onSubmit: action("submit")
}