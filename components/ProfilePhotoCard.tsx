'use client';

import React from 'react';
import Image from 'next/image';

const PROFILE_PHOTO_PATH = '/assets/aistudio/IMG_20260221_094158_522_9c399076.webp';

export default function ProfilePhotoCard() {
  return (
    <div className="hidden sm:block relative group">
      <div className="relative w-44 h-56 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-900">
        <Image
          src={PROFILE_PHOTO_PATH}
          alt="Foto profil Daniel Theo Santoso"
          fill
          sizes="176px"
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-[56%_38%] scale-[1.08] group-hover:scale-[1.12] transition-transform duration-500 ease-out"
        />
      </div>
    </div>
  );
}
