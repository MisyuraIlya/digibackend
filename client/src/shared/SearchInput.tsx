import React, { FC } from 'react'

interface SearchInputProps {
  search: string
  setSearch: (search: string) => void
  onActive: (bool: boolean) => void
}

const SearchInput: FC<SearchInputProps> = ({ search, setSearch, onActive }) => {
  return (
    <div className="search-cont">
      <input
        onClick={() => onActive(true)}
        onBlur={() => onActive(false)}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="חיפוש לקוח..."
      />
      {search ? (
        <span
          className="material-symbols-outlined search-img"
          onClick={() => setSearch('')}
        >
          close
        </span>
      ) : (
        <span className="material-symbols-outlined search-img">search</span>
      )}
    </div>
  )
}

export default SearchInput
