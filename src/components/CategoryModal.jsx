import { useEffect, useId } from "react";
import { Button, Grid, Header, Icon, Modal, Table } from "semantic-ui-react";

import { formatValue } from "./categoryFormatting.js";

export function DetailTable({ fields }) {
  return (
    <Table compact celled striped unstackable>
      <Table.Body>
        {fields.map(([label, value], index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <strong>{label}</strong>
            </Table.Cell>
            <Table.Cell>{value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function CategoryModal({
  item,
  onClose,
  icon,
  nameField = "name",
  fields,
  children,
  onBack,
  navigationKey,
  restoreFocus,
}) {
  const titleId = useId();
  const closeId = titleId + "-close";
  const contentId = titleId + "-content";
  useEffect(() => {
    if (navigationKey == null) return;
    const content = document.getElementById(contentId);
    content?.scrollTo({ top: 0 });
    content?.focus({ preventScroll: true });
    if (!content || !restoreFocus) return;
    restoreFocus(content);
    const observer = new MutationObserver(() => restoreFocus(content));
    observer.observe(content, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [navigationKey, contentId, restoreFocus]);
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
          const controls = [
            ...event.currentTarget.querySelectorAll(
              'button:not(:disabled), a[href], [tabindex="0"]',
            ),
          ].filter((element) => element.getClientRects().length);
          const index = controls.indexOf(document.activeElement);
          if (
            index === -1 ||
            (!event.shiftKey && index === controls.length - 1) ||
            (event.shiftKey && index === 0)
          ) {
            event.preventDefault();
            (event.shiftKey ? controls.at(-1) : controls[0])?.focus();
          }
        }
      }}
    >
      <Modal.Header>
        <Grid verticalAlign="middle">
          <Grid.Column width={13}>
            <Header
              as="h2"
              color="yellow"
              className="planet-modal-title"
              id={titleId}
            >
              <Icon name={icon} aria-hidden="true" />
              <Header.Content>
                {String(formatValue(item[nameField])).toUpperCase()}
              </Header.Content>
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
      <Modal.Content
        scrolling
        id={contentId}
        tabIndex={0}
        role="region"
        aria-labelledby={titleId}
      >
        {onBack && (
          <Button
            className="planet-modal-close planet-modal-back"
            type="button"
            size="small"
            icon="arrow left"
            aria-label="Back"
            title="Back"
            onClick={onBack}
          />
        )}
        {children ?? <DetailTable fields={fields} />}
      </Modal.Content>
    </Modal>
  );
}

export default CategoryModal;
