import React, {useState} from 'react'
import { useSearchParams } from 'react-router-dom'

function Search({posts, onSearch}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearch = (e) =>{
        const value = e.target.value;
        setSearchTerm(value)
        setSearchParams({q: value})
        onSearch(value)
    }
  return (
    <div>
        <input 
        type="search"
         placeholder="Search. . ." 
         value={searchTerm}
         onChange={handleSearch}
         className="input input-bordered w-96 max-w-xl rounded-full shadow-md bg-[#33374d] my-3" />
        </div>
  )
}

export default Search