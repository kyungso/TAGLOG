import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  flex: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
`;

const RightButtonsBlock = styled.div`
  flex: none;
  margin-left: auto;
`;

const PostActionButtons = ({ onEdit, onRemove, history }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  const onToList = () => {
    history.push('/');
  };

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onToList} leftButton>목록</ActionButton>
        <RightButtonsBlock>
          <ActionButton onClick={onEdit} right="right">수정</ActionButton>
          <ActionButton onClick={onRemoveClick} right="right">삭제</ActionButton>
        </RightButtonsBlock>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default withRouter(PostActionButtons);