import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import { UserInfo, UserInfoProps } from './Profile';
export default {
  title: 'Components/Profile',
  component: UserInfo,
  argTypes: {
  },
  decorators: [Story => <MemoryRouter><div className="profile-page"><Story /></div></MemoryRouter>]
} as Meta;

const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isUser: true,
  profile: {
    username: "Tomas",
    bio: "A Great Developer",
    image: null,
    following: false,
  },
  onFollow: action("follow"),
  onUnfollow: action("unfollow")
}