import React from 'react';

export interface ProfileInfo {
  name: string;
  age: number;
  email: string;
  address: string;
}

const profileInfo: ProfileInfo = {
  name: "Pedro Peralta",
  age: 21,
  email: "pedro.peralta@email.com",
  address: "Rua dos Cliques N20"
};

const ProfileSection: React.FC = () => {
  return (
    <section className="flex flex-wrap gap-10 self-end mt-6 w-full max-w-[1080px] max-md:max-w-full">
      <div className="flex relative flex-col self-start pt-4 mt-3 aspect-[0.996]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/55c88b218a49c9733dc8350ff6b37938ca9b9b776aed3b31c919a69dd1465644?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="Profile" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative z-10 shrink-0 rounded-full aspect-square bg-zinc-300 bg-opacity-10 h-[250px] max-md:mr-0" />
      </div>
      <div className="flex-auto px-16 py-12 rounded-xl bg-zinc-300 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start text-3xl tracking-tighter leading-tight text-black whitespace-nowrap max-md:mt-10">
              <div>Nome:</div>
              <div className="mt-8">Idade:</div>
              <div className="mt-8">Email:</div>
              <div className="self-stretch mt-8">Morada:</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start text-3xl tracking-tighter leading-tight text-black max-md:mt-10">
              <div>{profileInfo.name}</div>
              <div className="mt-8">{profileInfo.age}</div>
              <div className="self-stretch mt-8">{profileInfo.email}</div>
              <div className="mt-8">{profileInfo.address}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;