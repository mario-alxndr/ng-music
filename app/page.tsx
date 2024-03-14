'use client'

// Node Modules
import { useState } from 'react';
import { useRouter } from "next/navigation";

// Component
import Image from "next/image";

// Types
import { FormEvent } from 'react';

// Assets
import NgMusicLogo from '@/public/ng-music.png';

export default function HomePage() {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');

  const handeClickSearchPage = () => {
    if(!textInput) {
      router.push('search');
    } else {
      router.push(`search?term=${encodeURIComponent(textInput)}`);
    }
  };

  const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
    setTextInput(e.currentTarget.value);
  };

  return (
    <main className="flex items-center justify-between">
      <div className={'min-w-96 max-w-sm min-h-screen block mx-auto bg-color-home relative'}>
        <Image 
          className={'mx-auto mt-[50%]'}
          height={84} 
          width={72} 
          src={NgMusicLogo} 
          alt={'ng-music-logo'}
        />
        <div className={'absolute bottom-0 w-full m-auto px-[30px]'}>
          <input 
            className={'block w-full h-[40px] bg-white rounded-[20px] text-center text-input'}
            onChange={handleChangeSearch}
            placeholder="Artist / Album / Title"
            value={textInput}
            maxLength={25}
          />
          <button 
            className={'block w-full h-[40px] mt-[15px] mb-[26px] rounded-[20px] search-button'}
            onClick={handeClickSearchPage}
          >
              <p className={'text-white text-xs'}>Search</p>
          </button>
        </div>
      </div>
    </main>
  );
}
