import React, {ChangeEvent} from 'react';

function Search({onSearch}: {onSearch : (arg: ChangeEvent<HTMLInputElement>)=>void}): JSX.Element {
    return (
        <div className="d-flex justify-content-end py-2">
            <div className="w-25">
                <input
                    data-testid = "search-input"
                    onChange={onSearch}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                />
            </div>
        </div>
    )
}
export default Search;
