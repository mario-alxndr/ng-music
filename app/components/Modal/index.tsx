'use client';

// Node Modules
import { useState } from 'react';

// Type
import { FormEvent } from 'react';

type TModal = {
  inputText: string;
  onClickSearch: (localInputText: string) => void;
}

export default function Modal(props: TModal) {
  const { inputText, onClickSearch } = props;

  const [localInputText, setLocalInputText] = useState<string>(inputText);

  const isAbleSearch = !!localInputText;

  const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
    setLocalInputText(e.currentTarget.value);
  };

  const handleClickSearch = () => {
    if(isAbleSearch) {
      onClickSearch(localInputText);
    }
  }
  
  return (
    <div className='absolute w-full h-full bg-black/90 top-0 px-6'>
    <p className={'mt-[30vh] text-white text-center text-xl mb-5'}>Search</p>
    <input 
      className={'block w-full h-[40px] bg-white rounded-[20px] text-center text-input'}
      onChange={handleChangeSearch}
      placeholder="Artist / Album / Title"
      value={localInputText}
      maxLength={25}
    />
    <button 
      className={'block search-button-popup w-full h-[40px] mt-[15px] mb-[26px] rounded-[20px] search-button'}
      onClick={handleClickSearch} disabled={!isAbleSearch}>
        <p className={'text-white text-xs'}>Search</p>
    </button>
    </div>
  );
}
