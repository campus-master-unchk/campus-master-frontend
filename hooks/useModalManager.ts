"use client";

import { useState } from 'react';
import { User as UserType } from '@/types/userType';

export type ModalType = 'add' | 'view' | 'edit' | 'status' | 'delete' | null;

export function useModalManager() {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (user: UserType | null, modalType: ModalType) => {
    setSelectedUser(user);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  const openAddModal = () => openModal(null, 'add');
  const openViewModal = (user: UserType) => openModal(user, 'view');
  const openEditModal = (user: UserType) => openModal(user, 'edit');
  const openStatusModal = (user: UserType) => openModal(user, 'status');
  const openDeleteModal = (user: UserType) => openModal(user, 'delete');

  return {
    selectedUser,
    activeModal,
    openModal,
    closeModal,
    openAddModal,
    openViewModal,
    openEditModal,
    openStatusModal,
    openDeleteModal,
  };
}