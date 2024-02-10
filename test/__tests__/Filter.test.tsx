import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Filter from "../../src/Components/Filter/Filter";

test('it show items on filter box', () => {
  const container = render(<Filter />);

  expect(container.container.querySelector('#datatable > div > div > div:nth-child(1) > div > svg')).toBeInTheDocument();
  expect(screen.getByRole('textbox'));
  expect(screen.getByRole('list'));
  expect(screen.getAllByRole('combobox')).toHaveLength(2);
  expect(container.container.querySelector('#datatable > div > div > div:nth-child(2) > div > svg')).toBeInTheDocument();
})

test('it show options in condition select', () => {
  const container = render(<Filter />);
  
  expect(container.container.querySelector('.rdtfilter-condition')).toHaveLength(5);
})

test('add a filter', async () => {
  const container = render(<Filter />);
  
  const addButton = container.container.querySelector('#datatable > div > div > div:nth-child(2) > div > svg');
  const input = screen.getByRole('textbox');
  
  await userEvent.click(input);
  await userEvent.keyboard('test');

  if(addButton){
    await userEvent.click(addButton);
  }
  expect(screen.queryByRole('listitem')).toEqual(null);
})







