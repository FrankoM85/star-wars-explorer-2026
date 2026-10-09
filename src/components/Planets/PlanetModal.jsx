import { useId } from "react";
import { Button, Grid, Header, Icon, Modal, Table } from "semantic-ui-react";

const numberFormatter = new Intl.NumberFormat("en-US");

function formatValue(value, numeric = false) {
  if (value == null || String(value).trim() === "" || String(value).trim().toLowerCase() === "unknown") {
    return "N/A";
  }
  if (!numeric) return value;
  const number = Number(value);
  return Number.isFinite(number) ? numberFormatter.format(number) : "N/A";
}

function PlanetModal({ planet, onClose }) {
  const titleId = useId();
  const closeId = `${titleId}-close`;
  const contentId = `${titleId}-content`;
  if (!planet) return null;

  const fields = [
    ["Name", formatValue(planet.name)],
    ["Climate", formatValue(planet.climate)],
    ["Terrain", formatValue(planet.terrain)],
    ["Population", formatValue(planet.population, true)],
    ["Diameter", formatValue(planet.diameter, true)],
    ["Rotation Period (hours)", formatValue(planet.rotation_period, true)],
    ["Orbital Period (days)", formatValue(planet.orbital_period, true)],
    ["Gravity", formatValue(planet.gravity)],
    ["Surface Water (%)", formatValue(planet.surface_water, true)],
    ["Residents", Array.isArray(planet.residents) ? planet.residents.length : "N/A"],
    ["Films", Array.isArray(planet.films) ? planet.films.length : "N/A"],
  ];

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
              <Icon name="globe" aria-hidden="true" />
              <Header.Content>{String(formatValue(planet.name)).toUpperCase()}</Header.Content>
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

export default PlanetModal;
