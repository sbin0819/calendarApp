import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
type State = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
};

const ModalContext = React.createContext<State | null>(null);
ModalContext.displayName = 'ModalContext';

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within the Provider');
  }
  return context;
};

const ModalProvider = ({ children, offset }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startTime, setStartTime] = React.useState(() => offset.startTime);
  const [endTime, setEndTime] = React.useState(() => offset.endTime);
  return (
    <ModalContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
