import { useId } from "react";
import { Button, Grid, Header, Icon, Modal, Table } from "semantic-ui-react";

import { formatValue } from "./categoryFormatting.js";

function CategoryModal({ item, onClose, icon, nameField = "name", fields }) {
  const titleId = useId();
  const closeId = titleId + "-close";
  const contentId = titleId + "-content";
  if (!item) return null;

  return (
    <Modal
      open
      size="small"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      closeOnEscape
      closeOnDimmerClick
      onClose={onClose}
      onMount={() => document.getElementById(closeId)?.focus()}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          document.getElementById(event.target.id === closeId ? contentId : closeId)?.focus();
        }
      }}
    >
      <Modal.Header>
        <Grid verticalAlign="middle">
          <Grid.Column width={13}>
            <Header as="h2" color="yellow" className="planet-modal-title" id={titleId}>
              <Icon name={icon} aria-hidden="true" />
              <Header.Content>{String(formatValue(item[nameField])).toUpperCase()}</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={3} textAlign="right">
            <Button
              id={closeId}
              type="button"
              className="planet-modal-close"
              icon="close"
              size="small"
              aria-label="Close"
              onClick={onClose}
            />
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content scrolling id={contentId} tabIndex={0} role="region" aria-labelledby={titleId}>
        <Table compact celled striped unstackable>
          <Table.Body>
            {fields.map(([label, value]) => (
              <Table.Row key={label}>
                <Table.Cell><strong>{label}</strong></Table.Cell>
                <Table.Cell>{value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
    </Modal>
  );
}

export default CategoryModal;
