import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../button';
import Image from 'next/image';

const PubSection = () => {
  const p = useTranslations('PubSection');
  return (
    <>
      <div className='w-full h-auto flex flex-row justify-around items-center px-18 py-10 gap-10 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-5 max-w-lg'>
          <h1>{p('title')}</h1>
          <p>{p('subtitle')}</p>
          <Button>
            {p('button')}
          </Button>
        </div>
        <div className='flex flex-row gap-5'>
          <Image
          src={"/bac-pub.svg"}
          alt="Publicity Image"
          width={500}
          height={500}
          />
          <Image
          src={"/kya-sop.png"}
          alt="KYA-SOP Image"
          width={500}
          height={300}
          />
        </div>
        
      </div>
    </>
  )
}

export default PubSection
