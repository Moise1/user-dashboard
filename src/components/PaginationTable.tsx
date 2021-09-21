import React from 'react'

const PaginationTable = () => {
  return (
    <>
      <div className="pl-3 pr-5 py-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <span className="pagination-number">50</span>
            <span className="border-left-tab mx-2"></span>
            <span className="pagination-number">100</span>
            <span className="border-left-tab mx-2"></span>

            <span className="pagination-number">500</span>
          </div>

          <div className="d-flex pr-5">
            <span className="pagination-number mx-2">1</span>
            <span className="pagination-number">2</span>
            <span className="pagination-number mx-2"> 3</span>
            <span className="pagination-number mx-2"> 4</span>
            <span className="pagination-number">...</span>
            <span className="pagination-number mx-2">15</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaginationTable
