export const Pagination = ({
  results,
  pageSize,
  pageNumberOnClick,
  currentPage,
}) => {
  const totalPage = Math.floor(results / pageSize);

  const nextOnClick = () => {
    if (currentPage < totalPage) {
      pageNumberOnClick(currentPage + 1);
    }
  };

  const prevOnClick = () => {
    if (currentPage > 1) {
      pageNumberOnClick(currentPage - 1);
    }
  };

  return (
    <div>
      <button data-testid="prev-btn" onClick={prevOnClick}>
        {" "}
        Prev{" "}
      </button>
      {[...Array(totalPage).keys()].map((page) => (
        <button key={page} onClick={() => pageNumberOnClick(page + 1)}>
          {page + 1}
        </button>
      ))}
      <button data-testid="next-btn" onClick={nextOnClick}>
        {" "}
        Next{" "}
      </button>
    </div>
  );
};
