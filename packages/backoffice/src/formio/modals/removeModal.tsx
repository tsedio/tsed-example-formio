import { BxIcon } from "@project/shared";
import { InputText, Modal, ModalProps } from "@tsed/react-formio";
import React, { useState } from "react";

function RemoveModalFooter({
  value,
  valueToCompare,
  onSubmit,
  onClose
}: ModalProps) {
  return (
    <div className={"flex items-center justify-center bg-white p-2"}>
      <button
        data-testid='customCloseModal'
        className={"btn btn-outline-dark mx-2"}
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        disabled={valueToCompare !== value}
        data-testid='customSubmitModal'
        className={"btn btn-danger mx-2"}
        onClick={(e) => {
          if (valueToCompare === value) {
            onSubmit(e);
          }
        }}
      >
        <BxIcon name={"trash"} className={"pr-1"} />
        Remove
      </button>
    </div>
  );
}

export interface RemoveModal extends ModalProps {
  valueToCompare: string;
  itemType?: string;
}

export function RemoveModal(props: RemoveModal) {
  const [value, setValue] = useState();

  return (
    <Modal
      {...props}
      style={{ maxWidth: "300px" }}
      title={`Drop ${props.itemType?.toLowerCase()}`}
      value={value}
      footer={RemoveModalFooter}
    >
      <div className={"px-4 pt-3 pb-5"}>
        <div className={"pb-1"}>
          To drop <strong>{props.valueToCompare}</strong>, type the{" "}
          <strong>{props.itemType?.toLowerCase()}</strong> name{" "}
          <strong>{props.valueToCompare}</strong>.
        </div>
        <InputText
          name='remove'
          value={value}
          onChange={(name, value) => setValue(value)}
        />
      </div>
    </Modal>
  );
}
