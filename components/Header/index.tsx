// Component
import Image from "next/image";

// Assets
import MenuLogo from '@/public/menu-logo.png';
import MusicLogo from '@/public/ngmusic-title.png';
import SearchLogo from '@/public/search-logo.png';

type THeader = {
  onOpenModal: () => void;
}

export default function Header(props: THeader) {
  const { onOpenModal } = props;
  
  return (
    <header className={'bg-color-header py-[20px] px-[16px] h-[60px] flex justify-between relative'}>
      <button>
        <Image src={MenuLogo} alt={'menu-logo'} width={20} height={20} />
      </button>
      <Image src={MusicLogo} alt={'music-logo'} width={100} height={16} />
      <button onClick={onOpenModal}>
        <Image src={SearchLogo} alt={'search-logo'} width={20} height={20} />
      </button>
      <div className={'bg-color-header w-full h-[80px] absolute z-[-1] top-[-5px] left-0 border rounded-[15%] border-none'}/>
    </header>
  );
}
