import useEditModal from "@/hooks/useEditModal";
import React, { useEffect, useState } from "react";

import Modal from "../ui/modal";
import CoverImageUpload from "../profile/cover-image-upload";
 
 
import { IUser } from "@/types";
import ProfileImageUpload from "../profile/profile-image-upload";
import ProfileEditForm from "../profile/profile-edit-form";

interface Props{
    data:IUser
}

const EditModal = ({data}:Props) => {

  const editModal = useEditModal();

  const bodyContent = (
    <>
      <CoverImageUpload data={data} />
      <ProfileImageUpload data={data}/>
      <ProfileEditForm data={data}/>
    </>
  );

  return (
    <Modal
    title="Edit Profile"
      isOpen={editModal.isOpen}
      body={bodyContent}
      onClose={editModal.onClose}
    />
  );
};

export default EditModal;
