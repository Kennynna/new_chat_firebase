import React from 'react';
import styled from 'styled-components';

export function ButtonUi({ onClick, loading,text }) {
  return (
    <StyledWrapper>
      <button onClick={onClick} type='submit' disabled={loading} className='button' >
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.button {
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 18px;
  color: rgb(33, 150, 243); /* Основной синий */
  border: 2px solid rgb(33, 150, 243);
  border-radius: 34px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 90px;
  height: 90px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgb(33, 150, 243); /* Тот же синий для эффекта заливки */
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.button:hover::before {
  scale: 3;
}

.button:hover {
  color: #f9f9f9; /* Цвет текста при наведении */
  scale: 1.1;
  box-shadow: 0 0px 20px rgba(33, 150, 243, 0.4); /* Синяя тень */
}

.button:active {
  scale: 1;
}
`;