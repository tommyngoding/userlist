import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";

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
    <>
      <Button
        size="small"
        variant="outlined"
        data-testid="prev-btn"
        onClick={prevOnClick}
        disabled={currentPage === 1 ? true : false}
      >
        <LeftOutlined />
      </Button>
      {[...Array(totalPage).keys()].map((page) => (
        <Button
          variant="outlined"
          size="small"
          key={page}
          style={{
            border: `1px solid ${
              currentPage === page + 1 ? "#47b8f5" : "#dbdbdb"
            }`,
            color: `${currentPage === page + 1 ? "#47b8f5" : "black"}`,
          }}
          onClick={() => pageNumberOnClick(page + 1)}
        >
          {page + 1}
        </Button>
      ))}
      <Button
        size="small"
        variant="outlined"
        data-testid="next-btn"
        onClick={nextOnClick}
        disabled={currentPage === totalPage ? true : false}
      >
        <RightOutlined />
      </Button>
    </>
  );
};
