export interface ListPaginationProps {
  articlesCount: number;
  currentPage: number;
  onSetPage?: (page: number) => void;
}

export const ListPagination = (props: ListPaginationProps) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === props.currentPage;
          return (
            <li
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={(ev) => {
                ev.preventDefault();
                props.onSetPage?.(v);
              }}
              key={v.toString()}
            >
              <button type="button" className="page-link">
                {v + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
