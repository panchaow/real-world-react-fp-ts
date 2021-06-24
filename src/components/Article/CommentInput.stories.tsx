import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { action } from "@storybook/addon-actions";
import { CommentInput, CommentInputProps } from "./CommentInput";
import { User } from '../../types';

export default {
  title: "Components/CommentInput",
  component: CommentInput,
  argTypes: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="article-page">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<CommentInputProps> = (args) => <CommentInput {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  currentUser: {} as User,
  onSubmit: action("submit")
};
