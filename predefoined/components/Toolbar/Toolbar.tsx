import React from 'react';
import './Toolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../../../../components/shared/Button/index';
import { EditIcon } from '../../../../../../assets/icons';
import { DeleteIcon } from '../../../../../../assets/icons';
import { Tooltip } from '../../../../../../components/shared/Tooltip';


interface ToolbarProps {
  onCreate: () => void;
  onEdit: () => void;
  onDelete: () => void;
  editDisabled: boolean;
  deleteDisabled: boolean;
  width?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onCreate,
  onEdit,
  onDelete,
  editDisabled,
  deleteDisabled,
}) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-container">
  <div className="toolbar-actions">
    <button className="toolbar-btn create-btn " onClick={onCreate}>
      <FontAwesomeIcon icon={faPlus} /> Create
    </button>

    <Tooltip content="Edit">
      <Button  
        cssClass="e-none"
        clickEvent={onEdit}
        disabled={editDisabled}
        withBorder={false}
      >
        <img src={EditIcon} alt="Edit" aria-label="Edit icon" />
      </Button>
    </Tooltip>

    <Tooltip content="Delete">
      <Button
        cssClass="e-none"
        clickEvent={onDelete}
        disabled={deleteDisabled}
        withBorder={false}
      >
        <img src={DeleteIcon} alt="Delete" aria-label="Delete icon" />
      </Button>
    </Tooltip>
  </div>
</div>

    </div>
  );
};

export default Toolbar;
