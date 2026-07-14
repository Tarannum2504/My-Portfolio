import { useSearchParams } from "react-router-dom";

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const setQuery = (newQuery) => {
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("q");
      setSearchParams(nextParams);
    }
  };

  return [query, setQuery];
}
