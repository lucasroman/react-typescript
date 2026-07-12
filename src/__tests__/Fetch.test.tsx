import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FetchResult } from '../components/Fetch';

describe('Fetching movie', () => {

    it('It can input a movie on the search form', () => {
        render(<FetchResult />);
        
        // find input by label
        const input = screen.getByLabelText('Search');

        // Simulate input typing
        fireEvent.change(input, { target: { value: 'the matrix' } });

        expect(input).toHaveValue('the matrix');
    });
    // 2. It can get data from api about the movie searched
    // 3. It can see the data obtained
});