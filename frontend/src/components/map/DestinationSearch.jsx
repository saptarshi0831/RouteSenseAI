import { useState } from "react";
import { Search } from "lucide-react";

import { searchLocation } from "../../api/geocode.api";

import "../../styles/destination-search.css";

function DestinationSearch({
  onSelect,
}) {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    try {
      const response =
        await searchLocation(value);

      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="destination-search">

      <div className="search-box">

        <Search size={18} />

        <input
          value={query}
          placeholder="Search destination..."
          onChange={(e) =>
            handleSearch(e.target.value)
          }
        />

      </div>

      {results.length > 0 && (

        <div className="search-results">

          {results.map((place) => (

            <button
              key={place.place_id}
                onClick={() => {
                  setResults([]);
                  setQuery(place.display_name);
                
                  onSelect?.({
                    latitude: Number(place.lat),
                    longitude: Number(place.lon),
                    name: place.display_name,
                  });
                }}
            >
              {place.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DestinationSearch;