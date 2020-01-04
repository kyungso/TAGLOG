import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  padding: 5rem 0 2rem 0;
`;

const TitleInput = styled.input`
  font-size: 2.5em;
  outline: none;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-toolbar {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
  .ql-container {
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }
  .ql-editor {
    padding: 1rem;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 1rem;;
  }
`;

const Editor = ({ title, body, onChangeField }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'snow',
        placeholder: '내용을 작성하세요...',
        modules: {
          toolbar: {
            container: [
              [{'font': []}],
              [{ header: '1' }, { header: '2' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{'color': []}, {'background': []}],
              [{ list: 'ordered' }, { list: 'bullet' }, {'align': []}],
              ['blockquote', 'code-block', 'link', 'image'],
            ],
          },
        },
      });

      // quill에 text-change 이벤트 핸들러 등록
      const quill = quillInstance.current;
      quill.on('text-change', (delta, oldDelta, source) => {
        if(source === 'user') {
          onChangeField({ key: 'body', value: quill.root.innerHTML });
        }
      });
    }, [onChangeField]);

    const mounted = useRef(false);
    useEffect(() => {
      if(mounted.current) return;
      mounted.current = true;
      quillInstance.current.root.innerHTML = body;
    }, [body]);

    // useEffect(() => {
    //   quillInstance.current.root.innerHTML = body;
    // }, []);
    
    const onChangeTitle = e => {
      onChangeField({ key: 'title', value: e.target.value });
    };
    
    return (
      <EditorBlock>
        <TitleInput 
          placeholder="제목을 입력하세요" 
          onChange={onChangeTitle}
          value={title}
        />
        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
      </EditorBlock>
    );
};

export default Editor;