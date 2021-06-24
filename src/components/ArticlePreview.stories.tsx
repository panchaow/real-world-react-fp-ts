import { Story, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { ArticlePreview, ArticlePreviewProps } from './ArticlePreview';

export default {
  title: 'Components/ArticlePreview',
  component: ArticlePreview,
  argTypes: {
  },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>],
  excludeStories: /\.*Data$/
} as Meta;

const Template: Story<ArticlePreviewProps> = (args) => <ArticlePreview {...args} />;

export const Primary = Template.bind({});

export const articleData = {
  slug: "this-is-a-test-post",
  title: "This is a test post",
  description: "a decent test post",
  body: "It takes a Jacobian",
  tagList: ["test1", "test2"],
  createdAt: "2020-04-27T08:41:28.000",
  updatedAt: "2020-04-27T08:41:28.000",
  favorited: false,
  favoritesCount: 423,
  author: {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://i.stack.imgur.com/xHWG8.jpg",
    "following": false
  },
}

Primary.args = {
  article: articleData,
  onFavorite: action("favorite"),
  onUnfavorite: action("unfavorite")
}