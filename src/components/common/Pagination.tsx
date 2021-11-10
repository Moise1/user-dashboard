const Pagination = () => {
  return (
    <>
      {/* PAGINATION UI  */}
      <div className="bg-white d-flex  px-2 px-sm-4  justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center ">
          <p className="table-body-sell listing-table-border w-50px pr-2 pr-sm-3 mb-0">50</p>
          <p className="table-body-sell listing-table-border w-50px px-2 px-sm-3 mb-0">100</p>
          <p className="table-body-sell w-50px pl-3 mb-0">500</p>
        </div>
        <p className="mb-0">
          <span className="pagination-number w-50px px-2">1</span>
          <span className="pagination-number w-50px px-2">2</span>
          <span className="pagination-number w-50px px-2">3</span>
          <span className="pagination-number w-50px pl-2">4</span>
          <span className="pagination-number w-50px ">...</span>
          <span className="pagination-number w-50px px-2">5</span>
        </p>
      </div>
    </>
  );
};

export default Pagination;
