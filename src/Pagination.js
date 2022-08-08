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
      >
        <LeftOutlined />
      </Button>
      {[...Array(totalPage).keys()].map((page) => (
        <Button
          variant="outlined"
          size="small"
          key={page}
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
      >
        <RightOutlined />
      </Button>
    </>
  );
};
