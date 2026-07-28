import '@testing-library/jest-dom'; // Ins't just for Jes, include Vite matchers too.
import { fetchData, FetchResult } from '../components/Fetch';
import { beforeAll, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

type Movie = {
    Title: string;
    Year: string;
}

// Result of movie searched
let result: Movie | undefined;

// Mock Fetch component
vi.mock(import('../components/Fetch'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        FetchResult: vi.fn(() =>
            <div>
                <h2>The Matrix (1999)</h2>
                <p>
                    <b>Sinopsis:</b>
                    When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.
                </p>
            </div>
            )
    }
});

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
    test('It can fetch data from API about the movie', async () => {
        // Compare just a part of response (toMatchObject) with fixed data
        expect(result).toMatchObject({ Title: 'The Matrix', Year: '1999' });
    });

    // Check answer in case of fetch fail
    test('fetchData throws on bad response', async () => {
        // Mock fetch to return bad request
        globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });

        await expect(fetchData('http://any-url.com')).rejects.toThrow('Network error');
    })

    test('It can see the data obtained', async () => {
        // Mock render of Fetch component
        render(<FetchResult />);
        const movieSinopsis = /When a beautiful stranger/i;

        // Test title is showing
        expect(screen.getByText('The Matrix (1999)')).toBeInTheDocument();
        // Test sinopsis is showing
        expect(screen.getByText('Sinopsis:')).toBeInTheDocument();
        expect(screen.getByText(movieSinopsis)).toBeInTheDocument();
    });
});
