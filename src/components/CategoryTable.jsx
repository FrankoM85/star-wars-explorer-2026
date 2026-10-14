import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Grid,
  Icon,
  Input,
  Loader,
  Message,
  Pagination,
  Table,
} from "semantic-ui-react";
import { fetchStarWarsData } from "../api/fetch.js";
import CategoryHeading from "./CategoryHeading.jsx";
import MobileCategoryList from "./MobileCategoryList.jsx";
import { formatValue } from "./categoryFormatting.js";

function CategoryTable({
  active = true,
  name,
  endpoint,
  columns,
  ModalComponent,
  nameField = "name",
  modalItemProp = "item",
}) {
  const label = name.toLowerCase();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageRanges, setPageRanges] = useState([[0, 1]]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  const [loadAttempt, setLoadAttempt] = useState(0);
  const modalOpenerRef = useRef(null);
  const tableScrollRef = useRef(null);
  const searchInputRef = useRef(null);
  const retryPendingRef = useRef(false);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        String(item[nameField] ?? "")
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      ),
    [items, nameField, search],
  );
  const totalPages = filteredItems.length ? pageRanges.length : 0;
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const [start, end] = pageRanges[currentPage - 1];
  const paginatedItems = filteredItems.slice(start, end);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function openItem(item, event) {
    modalOpenerRef.current = event.currentTarget;
    setSelectedItem(item);
  }

  function closeItem() {
    setSelectedItem(null);
    modalOpenerRef.current?.focus({ preventScroll: true });
  }

  useLayoutEffect(() => {
    const liveRegion = tableScrollRef.current;
    if (!active || isMobile || !liveRegion || !filteredItems.length) return;
    let frame;

    function measureRows() {
      const region = liveRegion;
      const table = region.querySelector("table");
      // Reflow all records at the live column width to pack complete rows.
      const measurement = table.cloneNode(true);
      Object.assign(measurement.style, {
        position: "fixed",
        visibility: "hidden",
        pointerEvents: "none",
        top: "0",
        left: "0",
        margin: "0",
        width: table.getBoundingClientRect().width + "px",
      });
      measurement.setAttribute("aria-hidden", "true");
      measurement.inert = true;
      const body = measurement.querySelector("tbody");
      const template = body.rows[0];
      if (!template) return;
      body.replaceChildren(
        ...filteredItems.map((item) => {
          const row = template.cloneNode(true);
          [...row.cells].forEach((cell, index) => {
            const { key, numeric, format } = columns[index];
            cell.textContent = format
              ? format(item[key])
              : formatValue(item[key], numeric);
          });
          return row;
        }),
      );
      region.appendChild(measurement);
      try {
        const heights = [...body.rows].map(
          (row) => row.getBoundingClientRect().height,
        );
        const firstBorder =
          body.rows.length > 1
            ? parseFloat(
                getComputedStyle(body.rows[1].cells[0]).borderTopWidth,
              ) -
              parseFloat(getComputedStyle(body.rows[0].cells[0]).borderTopWidth)
            : 0;
        heights[0] += firstBorder;
        const headerHeight =
          measurement.getBoundingClientRect().height -
          heights.reduce((sum, height) => sum + height, 0) +
          firstBorder;
        const available = region.clientHeight - headerHeight;
        const ranges = [];
        let start = 0;
        let used = 0;
        heights.forEach((height, index) => {
          if (index > start && used + height - firstBorder > available) {
            ranges.push([start, index]);
            start = index;
            used = 0;
          }
          used += height;
        });
        ranges.push([start, heights.length]);
        setPageRanges((previous) =>
          previous.length === ranges.length &&
          previous.every(
            ([start, end], index) =>
              start === ranges[index][0] && end === ranges[index][1],
          )
            ? previous
            : ranges,
        );
        setPage((page) => Math.min(page, ranges.length));
      } finally {
        measurement.remove();
      }
    }

    function scheduleMeasurement() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureRows);
    }
    measureRows();
    const observer = new ResizeObserver(scheduleMeasurement);
    observer.observe(liveRegion);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [active, filteredItems, columns, isMobile]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchStarWarsData(endpoint, {
          signal: controller.signal,
        });
        if (
          !Array.isArray(data) ||
          data.some(
            (item) => !item || typeof item !== "object" || Array.isArray(item),
          )
        ) {
          throw new Error("Invalid category response");
        }
        if (!controller.signal.aborted) {
          setItems(
            [...data].sort((a, b) =>
              String(a[nameField] ?? "").localeCompare(
                String(b[nameField] ?? ""),
                "en",
              ),
            ),
          );
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(
            `Unable to load ${label}. Please check your connection and refresh the page.`,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          retryPendingRef.current = false;
        }
      }
    }

    loadItems();
    return () => controller.abort();
  }, [endpoint, label, nameField, loadAttempt]);

  if (!active) return null;

  return (
    <>
      <Grid
        stackable
        padded="vertically"
        verticalAlign="middle"
        className="planets-toolbar"
      >
        <Grid.Column mobile={16} tablet={8} computer={12}>
          <CategoryHeading name={name} />
        </Grid.Column>
        {!isLoading && !error && (
          <Grid.Column mobile={16} tablet={8} computer={4} textAlign="right">
            <Input
              className="planets-search"
              size="small"
              fluid
              icon
              placeholder={`Search ${label}...`}
              aria-label={`Search ${label} by ${nameField}`}
              value={search}
              onChange={(_, { value }) => {
                setSearch(value);
                setPage(1);
              }}
            >
              <input ref={searchInputRef} />
              {search !== "" ? (
                <Button
                  type="button"
                  className="planet-modal-close search-clear"
                  icon="close"
                  compact
                  size="small"
                  aria-label="Clear search"
                  title="Clear search"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                    searchInputRef.current?.focus({ preventScroll: true });
                  }}
                />
              ) : (
                <Icon name="search" aria-hidden="true" />
              )}
            </Input>
          </Grid.Column>
        )}
      </Grid>
      {isLoading ? (
        <div role="status">
          <Loader active inline="centered">
            Loading {label}...
          </Loader>
        </div>
      ) : error ? (
        <>
          <Message negative role="alert" content={error} />
          <Button
            type="button"
            className="category-retry mobile-list-action"
            disabled={isLoading}
            onClick={() => {
              if (retryPendingRef.current || isLoading) return;
              retryPendingRef.current = true;
              setIsLoading(true);
              setLoadAttempt((attempt) => attempt + 1);
            }}
          >
            ÚJRAPRÓBÁLKOZÁS
          </Button>
        </>
      ) : (
        <div className="category-results">
          {filteredItems.length === 0 ? (
            <Message content={`No ${label} found`} role="status" />
          ) : (
            <>
              {isMobile && (
                <MobileCategoryList
                  key={search}
                  name={name}
                  items={filteredItems}
                  nameField={nameField}
                  onOpen={openItem}
                />
              )}
              <div
                ref={tableScrollRef}
                className="planets-table-scroll"
                role="region"
                aria-label={`${name} table`}
                tabIndex={isMobile ? -1 : 0}
                aria-hidden={isMobile ? true : undefined}
                inert={isMobile ? "" : undefined}
              >
                <Table
                  fixed
                  celled
                  striped
                  selectable
                  unstackable
                  className="planets-table"
                >
                  <colgroup>
                    <col span={5} style={{ width: "20%" }} />
                  </colgroup>
                  <Table.Header>
                    <Table.Row>
                      {columns.map(({ label: column, icon }) => (
                        <Table.HeaderCell key={column} scope="col">
                          <span>{column}</span>
                          <Icon name={icon} color="grey" aria-hidden="true" />
                        </Table.HeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {paginatedItems.map((item, index) => (
                      <Table.Row
                        key={item.url ?? index}
                        tabIndex={0}
                        aria-label={`View details for ${formatValue(item[nameField])}`}
                        aria-haspopup="dialog"
                        onClick={(event) => openItem(item, event)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openItem(item, event);
                          }
                        }}
                      >
                        {columns.map(({ key, numeric, format }) => (
                          <Table.Cell key={key}>
                            {format
                              ? format(item[key])
                              : formatValue(item[key], numeric)}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </>
          )}
          <div className="planets-pagination-space">
            <Pagination
              className={`planets-pagination${totalPages <= 1 ? " is-placeholder" : ""}`}
              size="mini"
              aria-label={`${name} pages`}
              aria-hidden={totalPages <= 1 ? true : undefined}
              inert={totalPages <= 1 ? "" : undefined}
              activePage={currentPage}
              totalPages={Math.max(1, totalPages)}
              boundaryRange={0}
              siblingRange={0}
              firstItem={null}
              lastItem={null}
              prevItem={{
                "aria-label": "Previous item",
                content: "⟨",
                disabled: currentPage === 1,
              }}
              nextItem={{
                "aria-label": "Next item",
                content: "⟩",
                disabled: currentPage >= Math.max(1, totalPages),
              }}
              ellipsisItem={null}
              onPageChange={(_, { activePage }) => setPage(Number(activePage))}
            />
            {totalPages > 0 && (
              <span aria-label="Current page">
                {currentPage} / {totalPages}
              </span>
            )}
          </div>
        </div>
      )}
      <ModalComponent
        {...{ [modalItemProp]: selectedItem }}
        onClose={closeItem}
      />
    </>
  );
}

export default CategoryTable;
