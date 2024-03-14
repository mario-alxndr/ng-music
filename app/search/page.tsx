'use client'

// Node Modules
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, QueryClient } from '@tanstack/react-query';

// Components
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import MusicCard from '@/components/MusicCard';

// Lib
import { getItunesItem } from '@/lib/services/getItunesItem';

// Type
import { iTunesMediaType } from '@/lib/types/itunes';

const queryClient = new QueryClient();

export default function SearchPage() {
  const searchParam = useSearchParams();

  const router = useRouter();
  const termParam = searchParam.get('term');

  const [inputText, setInputText] = useState<string>(termParam || '');
  const [limit, setLimit] = useState<number>(4);
  const [isOpenModal, setIsOpen] = useState<boolean>(false);

  const { data: initialItunesItem, isLoading } = useQuery({
    queryKey: ['get-itunes-item', limit, inputText], 
    queryFn: () => getItunesItem(
      {
        limit: limit,
        term: inputText
    }),
  }, queryClient);
  const { results = [] } = initialItunesItem || {};

  const handleClickLoadMore = () => {
    setLimit(limit+4);
  };

  const handleClickSearch = (newTermValue: string) => {
    setInputText(newTermValue);
    router.replace(`search?term=${encodeURIComponent(newTermValue)}`);
    handleToggleModal();
  };

  const handleToggleModal = () => {
    setIsOpen(!isOpenModal);
  }

  return (
    <main className="flex items-center justify-between relative">
      <div className={'bg-light-gray min-w-96 max-w-sm min-h-screen block mx-auto relative'}>
        <Header onOpenModal={handleToggleModal}/>
        <p className='text-center mt-[54px] mb-[36px] text'>
          Search result for: <span className={'text-purple'}>{inputText}</span>
        </p>
        <div className={'px-[16px]'}>
          {isLoading ? (
            <p className={'text-center my-[16px]'}>Loading please wait...</p>
          ) : results.length > 0 ? (
            results.map((ituneItem: iTunesMediaType) => (
              <MusicCard ituneItem={ituneItem} key={ituneItem.trackId}/>
            ))
          ) : (
            <p className={'text-center my-[16px]'}>Empty result, please change or fill term search param</p>
          )}
        </div>
        {results.length > 0 && (
          <button 
            className={'bg-gray mx-auto block px-[30px] py-[10px] rounded-2xl mb-6'} 
            onClick={handleClickLoadMore}
          >
            <p className={'text-gray-500 text-xs'}>Load More</p>
          </button>
        )}
        {isOpenModal && (
          <Modal 
            inputText={inputText}
            onClickSearch={handleClickSearch}
            onToggleModal={handleToggleModal}
          />
        )}
      </div>
    </main>
  );
}
