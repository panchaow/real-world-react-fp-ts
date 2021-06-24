import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PureTags, PureTagsProps } from './Tags';

export default {
  title: 'Components/Tags',
  component: PureTags,
  argTypes: {
  },
} as Meta;

const Template: Story<PureTagsProps> = (args) => <PureTags {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  tags: ["test1", "test2", "test3"],
  onClickTag: action("clickTag")
}

export const Loading = Template.bind({});

Loading.args = {
}