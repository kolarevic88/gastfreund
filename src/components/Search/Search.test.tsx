import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from "./Search";
import userEvent from "@testing-library/user-event";

describe('Search component', () => {
    const onSearch = jest.fn();
    test('renders', async () => {
        const { container } = render(
            <Search onSearch={onSearch}/>
        );
        expect(container).toBeInTheDocument();
    });
    test('Calls onSearch', async () => {
        const { findByTestId } = render(
            <Search onSearch={onSearch}/>
        );
        const inputElement = await findByTestId('search-input');
        await userEvent.type(inputElement, 'Text');
        expect(inputElement).toHaveValue('Text');
    });
});
