import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { TodoList } from './Todolist';
import { ReduxStoreProviderDecorator } from '../../stories/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof TodoList> = {
  title: 'TODOLISTS/Todolist',
  component: TodoList,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
  args: {
    id: '12wsdewfijdei',
    title: 'JS',
    filter: 'all',
    changeFilter: action('Status changed inside Task'),
    removeTodolist: action('Title changed inside Task'),
    changeTodoTitle: action('Remove Button clicked changed inside Task')
  }
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    id: '12wsdewfijdei2343',
    title: 'JS',
    filter: 'all'
  },
};
