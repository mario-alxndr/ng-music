// Component
import Image from "next/image";

// Assets
import PlayButtonLogo from '@/public/play-button-logo.png';
import DollarLogo from '@/public/dollar-logo.png';

// Types
import { iTunesMediaType } from "@/lib/types/itunes";

type TMusicCard = {
  ituneItem: iTunesMediaType
}

export default function MusicCard(props: TMusicCard) {
  const { ituneItem } = props;
  const {
    artistName, 
    artworkUrl100,
    collectionName, 
    primaryGenreName,
    trackId,
    trackPrice,
  } = ituneItem;

  const isOverflow = primaryGenreName.length > 5;
  const maxLengthGenre = isOverflow ? 5 : primaryGenreName.length;
  const formattedGenre = isOverflow ? `${primaryGenreName.substring(0, maxLengthGenre)}...` : primaryGenreName;

  return (
    <div 
      key={trackId} 
      className={'h-32 bg-white p-[12px] border-radius rounded-xl mb-[20px] card-music flex gap-5 relative'}>
      <Image className={'rounded-[10px] min-w-[100px] max-h-[100px]'} src={artworkUrl100} width={100} height={100} alt={`music-card-${trackId}`}/>
      <Image className={'absolute left-[50px] top-[50px]'}src={PlayButtonLogo} width={32} height={32} alt={'play-button-logo'}/>
      <div className={'relative w-full'}>
        <p className={'text-[10px] text-black font-medium'}>{artistName}</p>
        <p className={'text-[14px] text-black font-medium line-clamp-3'}>{collectionName}</p>
        <div className={'absolute bottom-0 flex w-full justify-between'}>
          <div className="px-[12px] h-[20px] py-[4px] bg-emerald rounded-[10px]">
            <p className={'text-white text-[10px] text-ellipsis'}>{formattedGenre}</p>
          </div>
          {!!trackPrice && (
            <div>
              <Image className={'inline-block'} width={16} height={16} src={DollarLogo} alt={`dollar-logo-${trackId}`}/>
              <p className={'inline-block text-yellow text-[12px] ml-[6px] font-bold'}>{trackPrice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
