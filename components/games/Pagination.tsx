import React from "react";
import "../../styles/button.scss";
import "../../styles/styles.scss";

interface PaginationProp {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    updatePageNumber: (value) => void,
    updatePageSize: (value) => void,
}

const Pagination: React.FC<PaginationProp> = (
    {
        pageNumber,
        pageSize,
        totalPages,
        updatePageNumber,
        updatePageSize,
    }
) => {
    return (
        <div className="pagination">
            <div style={{marginRight: '10px'}}>
                <span>Page: {pageNumber}</span>
            </div>

            <div style={{marginRight: '10px'}}>
                <button
                    onClick={() => updatePageNumber(pageNumber - 1)}
                    disabled={pageNumber === 1}
                    className="custom-button"
                    style={{marginRight: '10px'}}
                >
                    Previous
                </button>

                <button
                    onClick={() => updatePageNumber(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                    className="custom-button"
                >
                    Next
                </button>
            </div>

            <div>
                <span> Page Size:</span>

                <select
                    value={pageSize} onChange={(e) => updatePageSize(Number(e.target.value))}
                    className="select"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
