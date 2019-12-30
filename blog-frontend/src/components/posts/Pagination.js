import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../../components/common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ page, username, tag }) => {
  const query = qs.stringify({ page, tag });
  return username ? `/community/@${username}?${query}` : `/community?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ page: page - 1, username, tag })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage ? undefined : buildLink({ page: page + 1, username, tag })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;