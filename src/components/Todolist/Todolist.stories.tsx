import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { Todolist } from './Todolist';
import { ReduxStoreProviderDecorator } from '../../stories/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof Todolist> = {
  title: 'TODOLISTS/Todolist',
  component: Todolist,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
  args: {
    id: '12wsdewfijdei',
    title: 'JS',
    filter: 'all',
    demo: true
  }
};

export default meta;
type Story = StoryObj<typeof Todolist>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    id: '12wsdewfijdei2343',
    title: 'JS',
    filter: 'all'
  },
};
