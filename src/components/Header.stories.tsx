import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { PureHeader, PureHeaderProps } from "./Header";
import { User } from '../types';

export default {
  title: "Components/Header",
  component: PureHeader,
  argTypes: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<PureHeaderProps> = (args) => <PureHeader {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  appName: "Conduit",
  currentUser: {
    username: "tom",
    image: null,
  } as User,
};

export const LoggedOut = Template.bind({});

Primary.args = {
  appName: "Conduit",
  currentUser: null
};
