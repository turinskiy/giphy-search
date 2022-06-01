import { useState, useEffect } from "react";
import "./styles.css";

function useGiphy(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "vNiWFDmaWvqLfp0zT7w7TP87jrieGvGv";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25&offset=0&rating=g&lang=en`
        );
        const json = await response.json();
        console.log({ json });
        setResults(
          json.data.map((item) => {
            return item.images.preview.mp4;
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return [results, loading];
}
export default function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, loading] = useGiphy(query);

  function onSubmit(e) {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          value={search}
          placeholder="Search for GIPHY"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <br />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        results.map((item) => <video autoPlay loop key={item} src={item} />)
      )}
    </div>
  );
}
