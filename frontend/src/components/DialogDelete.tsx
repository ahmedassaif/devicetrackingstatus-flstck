"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface DialogDeleteProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
  onCancel: () => void;
}

export function DialogDelete({ id, onDelete, onCancel }: DialogDeleteProps) {
  const deleteAction = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Modal show={true} size="md" onClose={onCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this item?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={deleteAction}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onCancel}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
