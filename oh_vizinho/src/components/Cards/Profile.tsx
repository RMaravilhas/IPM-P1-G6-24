import React, { useEffect, useRef, useState } from "react";
import EditProfileSection from "./EditProfile";
import { User } from "../../types/User";

export interface ProfileInfo {
  name: string;
  age: number;
  email: string;
  address: string;
  imageUrl?: string;
}

interface ProfileSectionProps {
  onClose: () => void;
  users: User[];
  userName: string | null;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onClose, users, userName }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    const foundUser = users.find((user) => user.name === userName);
    if (foundUser) {
      setUserProfile({
        name: foundUser.name,
        age: foundUser.age || 0,
        email: foundUser.email || " ",
        address: foundUser.address || " ",
        imageUrl: foundUser.imageUrl || "https://cdn.builder.io/api/v1/image/assets/TEMP/55c88b218a49c9733dc8350ff6b37938ca9b9b776aed3b31c919a69dd1465644?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
      });
    } else {
      console.log("User not found");
    }
  }, [userName, users]);

  const handleSave = (updatedInfo: Partial<ProfileInfo>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updatedInfo };
      setUserProfile(updatedProfile);

      const userIndex = users.findIndex((user) => user.name === userName);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          ...updatedProfile,
        };
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!userProfile) {
    return null;
  }

  if (isEditing) {
    return (
      <EditProfileSection
        profileInfo={userProfile}
        onSave={handleSave}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="w-[90%] max-w-md bg-white shadow-xl rounded-xl overflow-hidden transform transition hover:shadow-2xl"
      >
        <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
          <img
            src={userProfile.imageUrl}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="px-6 py-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {userProfile.name}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">{userProfile.email}</p>
            <p className="text-gray-500 text-sm md:text-base mt-1">{userProfile.address}</p>
            <div className="mt-4 text-gray-600">
              <span className="text-sm md:text-base font-semibold">Idade:</span>
              <span className="text-gray-800 font-semibold ml-2">
                {userProfile.age} anos
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold text-sm md:text-base rounded-lg shadow hover:bg-blue-600 transition"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
