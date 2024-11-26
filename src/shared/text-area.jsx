import React, {useState, useCallback, useMemo, useRef} from 'react';
import {TextareaAutosize as BaseTextareaAutosize} from '@mui/base/TextareaAutosize';
import {styled} from '@mui/system';
import Button from "@mui/material/Button";
import EmojiPicker from 'emoji-picker-react';
import {Smile} from 'lucide-react';
import {userStoreMessage} from "../lib/userStore.js";

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({theme}) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    &:focus-visible {
      outline: 0;
    }
  `
);

const MemoizedTextarea = React.memo(React.forwardRef(({value, onChange, onKeyDown}, ref) => (
    <Textarea
        aria-label="textarea"
        minRows={2}
        placeholder="Text"
        sx={{backgroundColor: 'transparent', color: 'white'}}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
    />
)));

const TextArea = ({text, setText}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const {addMessage} = userStoreMessage();
    const textareaRef = useRef(null);

    const formatDate = (date) => {
        const options = {day: 'numeric', month: 'long'};
        return new Date(date).toLocaleDateString('ru-RU', options);
    }

    const handleMessage = () => {
        if (text.trim()) {
            const userMessage = {
                message: text.trim(),
                name: 'Magomed',
                date: formatDate(new Date()),
                id: Date.now()
            };
            addMessage(userMessage);
            setText('');
            scrollToBottom();
        }
    }

    const enterDawn = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Предотвращаем стандартное поведение (перенос строки)
            if (text.trim()) {
                handleMessage();
            }
        }
    };

    const handleChange = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const handleEmojiClick = useCallback((emojiObject) => {
        setText((prevText) => prevText + emojiObject.emoji);
        setOpen(false);
    }, []);

    const memoizedEmojiPicker = useMemo(() => (
        <EmojiPicker
            open={open}
            onEmojiClick={handleEmojiClick}
            className={'absolute left-0 bottom-[500px] z-10'}
            emojiStyle='apple'
        />
    ), [open, handleEmojiClick]);

    const scrollToBottom = () => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    };

    return (
        <div className={'flex flex-col gap-4 items-center pr-2'}>
            <div className={'flex items-center gap-2 w-full '}>
                <MemoizedTextarea
                    value={text}
                    onChange={handleChange}
                    onKeyDown={enterDawn}
                    ref={textareaRef}
                />
                <div className={'relative w-8 h-8'}>
                    <Smile className="cursor-pointer" onClick={() => setOpen(!open)}/>
                    {open && memoizedEmojiPicker}
                </div>
                <Button
                    style={{backgroundColor: '#1e40af', color: 'white', padding: '6px 15px'}}
                    onClick={handleMessage}
                >
                    Отправить
                </Button>
            </div>
        </div>
    );
};

export default React.memo(TextArea);

