import { useState, useMemo, useRef, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import useProducts from "../../static/useProducts";
import "./Search.css";

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function Search() {
  const PRODUCTS = useProducts();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const debouncedQuery = useDebounce(query);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const q = debouncedQuery.toLowerCase();

    return PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.parentCategory?.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [debouncedQuery]);

  const clear = () => {
    setQuery("");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        clear();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className={`search-box ${open && query.trim() ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Mahsulotlar va turkumlar izlash"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
        />

        <button className="clear-btn" onClick={clear}>
          {query.trim() && <IoClose />}
        </button>

        <button className="search-btn">
          <HiSearch />
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/category/${p.parentCategory}/${p.category}`}
              className="search-item"
              onClick={clear}
            >
              <img src={p.url} alt={p.title} />
              <div>
                <p className="title">{p.title}</p>
                <span className="price">
                  {p.price.toLocaleString()} so‘m
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {open && debouncedQuery.trim() && results.length === 0 && (
        <div className="search-dropdown empty">
          <p>❌ Bunday mahsulot topilmadi</p>
        </div>
      )}
    </div>
  );
}

export default Search;
