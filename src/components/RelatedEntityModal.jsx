import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Loader, Message } from "semantic-ui-react";
import CategoryModal, { DetailTable } from "./CategoryModal.jsx";
import { relatedEntities, relationshipUrls } from "./relatedEntities.js";
import { fetchRelatedEntity } from "../api/fetch.js";
import { formatValue } from "./categoryFormatting.js";

function RelationshipValue({ value, onOpen, controlId }) {
  return (
    <div className="planet-modal-relationship">
      <span>{value}</span>
      <Button
        type="button"
        className="planet-modal-close planet-modal-related"
        compact
        size="small"
        icon="chevron right"
        aria-label="Details"
        title="Details"
        data-related-control={controlId}
        onClick={onOpen}
      />
    </div>
  );
}

function RelatedList({ view, onOpen }) {
  const [results, setResults] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    Promise.allSettled(
      view.urls.map((url) => fetchRelatedEntity(url, view.category)),
    ).then((loaded) => {
      if (active) setResults(loaded);
    });
    return () => {
      active = false;
    };
  }, [view, attempt]);

  if (!results)
    return (
      <div role="status">
        <Loader active inline="centered">
          Loading {view.label.toLowerCase()}...
        </Loader>
      </div>
    );
  const failed = results.filter(
    (result) => result.status === "rejected",
  ).length;
  return (
    <>
      {failed > 0 && (
        <Message negative role="alert">
          <p>
            Unable to load {failed} related{" "}
            {failed === 1 ? "entity" : "entities"}.
          </p>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setResults(null);
              setAttempt((value) => value + 1);
            }}
          >
            Retry
          </Button>
        </Message>
      )}
      {results.length === 0 && (
        <Message role="status">No {view.label.toLowerCase()} found.</Message>
      )}
      {results.some((result) => result.status === "fulfilled") && (
        <DetailTable
          fields={results.flatMap((result, index) =>
            result.status === "fulfilled"
              ? [
                  [
                    view.rowLabel,
                    <RelationshipValue
                      key={view.urls[index]}
                      controlId={view.urls[index]}
                      value={formatValue(
                        result.value[relatedEntities[view.category].nameField],
                      )}
                      onOpen={(event) =>
                        onOpen(result.value, view.urls[index], event)
                      }
                    />,
                  ],
                ]
              : [],
          )}
        />
      )}
    </>
  );
}

function RelatedEntityModal({ item, category, onClose }) {
  const [history, setHistory] = useState([]);
  const restoreControl = useRef(null);
  const view = history.at(-1) ?? { kind: "detail", item, category };
  const push = (next, controlId, event) => {
    const openerScrollTop =
      event.currentTarget.closest(".scrolling.content")?.scrollTop ?? 0;
    setHistory((previous) => [
      ...previous,
      { ...next, opener: controlId, openerScrollTop },
    ]);
  };
  const back = () => {
    restoreControl.current = {
      controlId: view.opener,
      scrollTop: view.openerScrollTop,
    };
    setHistory((previous) => previous.slice(0, -1));
  };
  const restoreFocus = useCallback((content) => {
    if (!restoreControl.current) return;
    const control = [
      ...content.querySelectorAll("[data-related-control]"),
    ].find(
      (element) =>
        element.dataset.relatedControl === restoreControl.current.controlId,
    );
    if (control) {
      content.scrollTop = restoreControl.current.scrollTop;
      control.focus({ preventScroll: true });
      const bounds = content.getBoundingClientRect();
      const button = control.getBoundingClientRect();
      if (button.top < bounds.top + 4)
        content.scrollTop += button.top - bounds.top - 4;
      else if (button.bottom > bounds.bottom - 4)
        content.scrollTop += button.bottom - bounds.bottom + 4;
      restoreControl.current = null;
    }
  }, []);
  const detail = relatedEntities[view.category];
  const fields =
    view.kind === "detail"
      ? detail.fields(view.item).map(([label, value]) => {
          const relationship = detail.relationships.find(
            ([fieldLabel]) => fieldLabel === label,
          );
          if (!relationship) return [label, value];
          const [, field, target, rowLabel] = relationship;
          const urls = relationshipUrls(view.item[field], target);
          return [
            label,
            urls.length ? (
              <RelationshipValue
                key={field}
                value={value}
                controlId={field}
                onOpen={(event) =>
                  push(
                    {
                      kind: "list",
                      label,
                      rowLabel,
                      category: target,
                      urls,
                      title: `${formatValue(view.item[detail.nameField])} — ${label}`,
                      icon: detail.icon,
                    },
                    field,
                    event,
                  )
                }
              />
            ) : (
              value
            ),
          ];
        })
      : [];

  return (
    <CategoryModal
      item={view.kind === "detail" ? view.item : { name: view.title }}
      onClose={onClose}
      icon={view.kind === "detail" ? detail.icon : view.icon}
      nameField={view.kind === "detail" ? detail.nameField : "name"}
      fields={fields}
      onBack={history.length ? back : undefined}
      navigationKey={history.length}
      restoreFocus={restoreFocus}
    >
      {view.kind === "list" ? (
        <RelatedList
          key={history.length}
          view={view}
          onOpen={(related, controlId, event) =>
            push(
              { kind: "detail", category: view.category, item: related },
              controlId,
              event,
            )
          }
        />
      ) : undefined}
    </CategoryModal>
  );
}

export default RelatedEntityModal;
