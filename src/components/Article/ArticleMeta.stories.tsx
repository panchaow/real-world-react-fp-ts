import { Story, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { ArticleMeta, ArticleMetaProps } from './ArticleMeta';
import { articleData } from '../ArticlePreview.stories';

export default {
  title: 'Components/ArticleMeta',
  component: ArticleMeta,
  argTypes: {
  },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>],
} as Meta;

const Template: Story<ArticleMetaProps> = (args) => <ArticleMeta {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  article: articleData,
  onDelete: action("delete")
}