import React, { useState } from "react";
import UploadDocumentList from "./UploadDocumentList";

function FormDocumentPicker({ documentUris, handleAdd, handleDelete }) {
  // const [documentUris, setDocumentUris] = useState([]);

  return (
    <UploadDocumentList
      documentUris={documentUris}
      onRemoveDocument={handleDelete}
      onAddDocument={handleAdd}
    />
  );
}

export default FormDocumentPicker;
