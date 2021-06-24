import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { action } from "@storybook/addon-actions";
import { Comment, CommentProps } from "./Comment";

export default {
  title: "Components/ArticleMeta",
  component: Comment,
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

const Template: Story<CommentProps> = (args) => <Comment {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  showDelete: true,
  comment: {
    id: 1,
    body: "My first comment",
    createdAt: "2020-04-27T08:41:28.000",
    updatedAt: "2020-04-27T08:41:28.000",
    author: {
      username: "Tomas",
      image: null,
      bio: "A great developer",
      following: false,
    },
  },
  onDelete: action("delete"),
};
