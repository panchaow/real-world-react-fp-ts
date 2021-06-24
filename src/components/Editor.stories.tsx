import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EditorForm, EditorFormProps } from './EditorForm';

export default {
  title: 'Components/Editor',
  component: EditorForm,
  argTypes: {
  },
} as Meta;

const Template: Story<EditorFormProps> = (args) => <EditorForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  initialValues: {
    title: "Hello World"
  },
  onSubmit: action("submit")
}