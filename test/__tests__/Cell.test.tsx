import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Cell from '../../src/Components/Cell/Cell';
import { ColumnType } from '../../src/Type/Type';
import { ProductsData } from '../../examples/ExampleData/ExampleData';


test('it show text in cell', () => {
    const column: ColumnType = { field: { title: 'price' }, label: 'Price' };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByText('109.95'));
})

test('it show value in textarea', () => {
    const column: ColumnType = { field: { title: 'price' }, label: 'Price', kind:"textarea" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByRole('textbox')).toHaveValue('109.95');
})

test('it show value in textbox', () => {
    const column: ColumnType = { field: { title: 'price' }, label: 'Price', kind:"input/textbox" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByRole('textbox')).toHaveValue('109.95');
})

test('it show value in input number', () => {
    const column: ColumnType = { field: { title: 'price' }, label: 'Price', kind:"input/number" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByRole('spinbutton')).toHaveValue(109.95);
})

test('it show value in input password', () => {
    const column: ColumnType = { field: { title: 'price' }, label: 'Price', kind:"input/password" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByDisplayValue('109.95'));
})

test('it show value in input date', () => {
    const column: ColumnType = { field: { title: 'date' }, label: 'Add date', kind:"input/date" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByDisplayValue('2024-01-01'));
})

test('it show value in input datetime', () => {
    const column: ColumnType = { field: { title: 'date' }, label: 'Add date', kind:"input/datetime-local" };
    const container = render(<Cell row={ProductsData[0]} column={column} />);

    expect(container.container.querySelector('#datatable > div > input'));
})

test('it show button and click event', async () => {
    let data:any;
    const onClick = (rowData:any) => {
        data = rowData;
    }
    const row :any = {id:1, title:'test'};
    const column: ColumnType = { field: { title: 'show data', eventHandlerRow: onClick }, label: '', kind: "button" };

    render(<Cell row={row} column={column} />);

    const button = screen.getByRole('button', { name: 'show data' });
    await userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(data).toEqual({id:1, title:'test'});
})

test('it show values in select', () => {
    const column: ColumnType = { field: { title: 'color' }, label: 'Color', kind:"select" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByRole('combobox')).toHaveLength(5);
    expect(screen.getByRole('combobox')).toHaveValue('blue'); 
})

test('it show values in checkbox', () => {
    const column: ColumnType = { field: { title: 'active' }, label: 'Active', kind: "boolean" };
    render(<Cell row={ProductsData[0]} column={column} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
})

test('it show values in progress', () => {
    const column: ColumnType = { field: { title: 'rating' }, label: 'Rating', kind: "progress" };
    const container = render(<Cell row={ProductsData[0]} column={column} />);

    expect(container.container.querySelector('#datatable > div > progress'));
})

test('it show component', () => {
    const column: ColumnType = {
        field: { title: 'title' }, label: 'Title', kind: "component",
        options: { component: (value, onChange) => (<input value={value} onChange={(event: any) => onChange && onChange(event.target.value)} />) }
    };

    render(<Cell row={ProductsData[2]} column={column} />);

    expect(screen.getByRole('textbox')).toHaveValue('Mens Cotton Jacket');
})









