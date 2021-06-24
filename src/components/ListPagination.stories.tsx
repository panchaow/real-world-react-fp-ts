import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ListPagination, ListPaginationProps } from './ListPagination';

export default {
  title: 'Components/ListPagination',
  component: ListPagination,
  argTypes: {
  },
} as Meta;

const Template: Story<ListPaginationProps> = (args) => <ListPagination {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  articlesCount: 35,
  currentPage: 2,
  onSetPage: action("setPage")
}