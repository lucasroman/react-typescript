import { useState, useEffect } from 'react';

// Interface for 'Movie'
type Movie = {
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
}

type SearchFormProps = {
    search: string;
    setSearch: (value: string) => void;
    setQuery: (value: string) => void;
}

async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return res.json() as Promise<T>;
}

function SearchForm({search, setSearch, setQuery}: SearchFormProps): React.ReactNode {
    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setQuery(search);
    }

    return (
        <form onSubmit={handleSearch}>
            <label>Search: </label>
            <input type="text" onChange={(e) => setSearch(e.target.value)}
                value={search} />
            <button type="submit"> &#128270;</button>
        </form>
    )
}

export function FetchResult() {
    // data: have all movie info
    const [data, setData] = useState<Movie | null>(null);
    // loading: to inform process status in each moment
    const [loading, setLoading] = useState(false);
    // error: save and show the error if it produce 
    const [error, setError] = useState<string | null>(null);
    // search is the intermediate storage (meanwhile user write)
    const [search, setSearch] = useState('');
    // save the last state of 'search' to fetch the data
    const [query, setQuery] = useState('');

    // API url to get content
    // Get a free API key on https://www.omdbapi.com/apikey.aspx
    const url = `http://www.omdbapi.com/?t=${query}&apikey=${import.meta.env.VITE_API_KEY}`;

    useEffect(() => {
        if (!query) return;
        async function load() {
            setLoading(true);
            try {
                const result = await fetchData<Movie>(url);
                setData(result);
            } catch (err) {
                setError('Failure to fetch data');
            } finally {
                setLoading(false);
            }

        }
        load(); // necessary for load function run
    }, [query]); // rerun effect each time query changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <SearchForm search={search} setSearch={setSearch}
                setQuery={setQuery} />
            {data && (
                <>
                <h2>{data.Title} ({data.Year})</h2>
                <img src={data.Poster} alt={data.Title} />
                <p><b>Sinopsis:</b> {data.Plot}</p>
                </>
            )}
        </div>
    );
}