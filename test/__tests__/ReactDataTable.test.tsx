import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import ReactDataTable from '../../src/ReactDataTable/ReactDataTable';
import { ProductsData } from '../../examples/ExampleData/ExampleData';
import { ColumnType } from "../../src/Type/Type";

const renderComponent = () => {
  const columns: ColumnType[] = [
    { field: { title: 'title' }, label: 'Title' },
    { field: { title: 'price' }, label: 'Price' },
    { field: { title: 'stock' }, label: 'Stock', kind: 'input/number' },
    { field: { title: 'category' }, label: 'Category', kind: 'input/textbox' },
    { field: { title: 'active' }, label: 'Active', kind: 'boolean' },
    { field: { title: 'click me!', eventHandlerRow: () => { } }, label: 'Modify', kind: 'button' }
  ]
  render(<ReactDataTable rows={ProductsData} columns={columns} />);
}

// ** Menu
test('it show 5 button and title', () => {
  renderComponent();

  expect(screen.getByTestId('rdt-menu-title')).toBeInTheDocument();
  expect(screen.getByTitle('Search')).toBeInTheDocument();
  expect(screen.getByTitle('Download Excel')).toBeInTheDocument();
  expect(screen.getByTitle('Print')).toBeInTheDocument();
  expect(screen.getByTitle('View Columns')).toBeInTheDocument();
  expect(screen.getByTitle('Filter Table')).toBeInTheDocument();
  expect(screen.queryByTitle('Delete Selected Rows')).not.toBeInTheDocument();
})

test('click search button and search in table', async () => {
  renderComponent();

  const buttonSearch = screen.getByTitle('Search');
  await userEvent.click(buttonSearch);

  const textSearch = screen.getByTestId('rdt-search');
  await userEvent.click(within(textSearch).getByRole('textbox'));
  await userEvent.keyboard('695');

  expect(await screen.findAllByRole('row')).toHaveLength(2);
})

test('click view columns button and get action', async () => {
  renderComponent();

  expect(screen.getAllByRole('columnheader')).toHaveLength(7);

  const buttonViewColumns = screen.getByTitle('View Columns');
  await userEvent.click(buttonViewColumns);

  const columnsListCheckbox = screen.getAllByTestId('rdt-showcolumn__li');
  expect(columnsListCheckbox).toHaveLength(6);

  await userEvent.click(columnsListCheckbox[0]);
  expect(screen.getAllByRole('columnheader')).toHaveLength(6);
})

test('click filter button', async () => {
  renderComponent();

  const buttonFilter = screen.getByTitle('Filter Table');
  await userEvent.click(buttonFilter);
  const filterBox = screen.getByTestId('rdt-filter');

  expect(filterBox).toBeInTheDocument();
  expect(within(filterBox).getAllByRole('combobox')).toHaveLength(2);
  expect(within(filterBox).getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByTitle('Add Filter')).toBeInTheDocument();
})

test('select row and show select bar', async () => {
  renderComponent();

  const selectRows = screen.getAllByTestId('rdt-table-row__select-cell');
  await userEvent.click(selectRows[0]);

  expect(screen.queryByTestId('rdt-menu-title')).not.toBeInTheDocument();
  expect(screen.queryByTitle('Search')).not.toBeInTheDocument();
  expect(screen.queryByTitle('Download Excel')).not.toBeInTheDocument();
  expect(screen.queryByTitle('Print')).not.toBeInTheDocument();
  expect(screen.queryByTitle('View Columns')).not.toBeInTheDocument();
  expect(screen.queryByTitle('Filter Table')).not.toBeInTheDocument();

  const deleteButton = screen.getByTitle('Delete Selected Rows');
  await userEvent.click(deleteButton);

  expect(screen.getByTestId('rdt-menu-title')).toBeInTheDocument();
})

// ** table
test('it show rows and columns', () => {
  renderComponent();

  expect(screen.getAllByRole('row')).toHaveLength(11);
  expect(screen.getAllByRole('columnheader')).toHaveLength(7);
})

test('it show data on first row cells', () => {
  renderComponent();

  const rows = screen.getAllByRole('row');
  expect(within(rows[1]).getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')).toBeInTheDocument();
  expect(within(rows[1]).getByText('109.95')).toBeInTheDocument();
  expect(within(rows[1]).getByRole('spinbutton')).toHaveValue(3);
  expect(within(rows[1]).getByRole('textbox')).toHaveValue('men\'s clothing');
  expect(within(rows[1]).getAllByRole('checkbox')[1]).not.toBeChecked();
  expect(within(rows[1]).getByRole('button')).toHaveTextContent('click me!');
})

test('it show items on pagination box', () => {
  renderComponent();

  const pagination = screen.getByTestId('rdt-pagination');
  expect(pagination).toBeInTheDocument();

  expect(within(pagination).getAllByRole('button')).toHaveLength(6);
  expect(within(pagination).getByTitle('First Page')).toBeInTheDocument();
  expect(within(pagination).getByTitle('Last Page')).toBeInTheDocument();
  expect(within(pagination).getByTitle('Next Page')).toBeInTheDocument();
  expect(within(pagination).getByTitle('Previous Page')).toBeInTheDocument();
  expect(within(pagination).getByRole('button', {name:'1'})).toBeInTheDocument();
  expect(within(pagination).getByRole('button', {name:'2'})).toBeInTheDocument();

  expect(within(pagination).getByText('Rows per page:')).toBeInTheDocument();
  expect(within(pagination).getByRole('combobox')).toHaveLength(5);
  expect(within(pagination).getByRole('combobox')).toHaveValue('10');
})






