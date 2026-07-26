import '@testing-library/jest-dom'; // Ins't just for Jes, include Vite matchers too.
import { fetchData } from '../components/Fetch';
import { beforeAll, beforeEach } from 'vitest';

type Movie = {
    Title: string;
    Year: string;
}

// Result of movie searched
let result: Movie | undefined;

// Response of API available for all tests on 'result' variable
beforeAll(async () => {
    const query = 'the matrix';
    const url = `http://www.omdbapi.com/?t=${query}&apikey=${import.meta.env.VITE_API_KEY}`;
    result = await fetchData<Movie>(url);
});

// Guarantee that each test runs at least one assertion
beforeEach(() => {
    expect.hasAssertions();
});

describe('Fetching movie', () => {
    // Check that the app is fetching data from API
    test.only('It can fetch data from API about the movie', async () => {
        // Compare just a part of response (toMatchObject) with fixed data
        expect(result).toMatchObject({ Title: 'The Matrix', Year: '1999' });
    });

    // Check answer in case of fetch fail
    test.only('fetchData throws on bad response', async () => {
        // Mock fetch to return bad request
        globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });

        await expect(fetchData('http://any-url.com')).rejects.toThrow('Network error');
    })

    test.todo('It can see the data obtained', () => {

    });
});
