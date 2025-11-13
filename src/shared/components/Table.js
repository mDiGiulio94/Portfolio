import styled from "styled-components";
import Loading from "../../feature/Loading";

const getAtPath = (obj, path) =>
  path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);

export default function Table({
  columns,
  items,
  error,
  loading,
  onRowClick,
  rowKey,
}) {
  if (loading && items?.length === 0)
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  if (error) return <p>Errore: {error}</p>;

  return (
    <>
      <TableX>
        {/* Larghezze colonne */}
        <colgroup>
          {columns.map((c, index) => (
            <col key={index} style={{ width: c.width || "auto" }} />
          ))}
        </colgroup>

        <Thead>
          <Tr>
            {columns.map((c, index) => (
              <Th key={index}>{c.label}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {items.map((row, rIdx) => {
            const key = rowKey ? rowKey(row, rIdx) : rIdx;
            return (
              <Tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                role={onRowClick ? "button" : undefined}
              >
                {columns.map((col, cIdx) => {
                  let content = null;
                  if (col.accessor) {
                    content = col.accessor(row);
                  } else if (col.key) {
                    content =
                      typeof col.key === "string"
                        ? getAtPath(row, col.key)
                        : row[col.key];
                  }
                  if (
                    content === undefined ||
                    content === null ||
                    content === ""
                  )
                    content = "-";

                  return (
                    <Td key={cIdx} data-col={col.id || cIdx}>
                      {content}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </TableX>
    </>
  );
}

const TableX = styled.table`
  width: 100%;
  font-size: 14px;
  overflow-x: auto;
  border-collapse: collapse;
  border-radius: 5px;
  /* box-shadow: 0 8px 10px rgba(2, 6, 23, 0.12); */
`;

const Thead = styled.thead``;

const Tbody = styled.tbody`
  & > tr {
    border-bottom: 1px solid #ccc;
  }
`;

const Tr = styled.tr``;

const Th = styled.th`
  padding: 6px 8px;
  font-weight: 600;
  white-space: nowrap;
  font-size: 16px;
  text-align: left;
  padding-left: 0;
`;

const Td = styled.td`
  padding: 30px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 1px; /* trucco per far funzionare ellipsis con table-layout: fixed */
  font-variant-numeric: tabular-nums;
  padding-left: 0;
  &[data-align="right"] {
    text-align: right;
  }
  &[data-align="center"] {
    text-align: center;
  }
`;
