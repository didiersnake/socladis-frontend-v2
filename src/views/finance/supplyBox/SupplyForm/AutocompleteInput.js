import React, { useState } from 'react'

const AutocompleteInput = ({ field, form, suggestions, placeholder }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value || ""
        form.setFieldValue(field.name, value)

        // Filter suggestions based on input value
        if (value) {
            const filtered = suggestions?.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredSuggestions(filtered)
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (suggestion) => {
        form.setFieldValue(field.name, suggestion)
        setShowSuggestions(false)
    }

    return (
        <div className="relative">
            <input
                type="text"
                {...field} // Includes Formik's `value` and `name`
                placeholder={placeholder}
                onChange={handleChange}
                value={field.value || ""}
                className="border p-2 w-full rounded-md h-11"
            />
            {showSuggestions && filteredSuggestions?.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-auto">
                    {filteredSuggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="cursor-pointer hover:bg-gray-200 p-2"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutocompleteInput
