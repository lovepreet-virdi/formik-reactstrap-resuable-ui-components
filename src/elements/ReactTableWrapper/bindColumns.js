import { makeHeaderReadable } from "./utils";

export const bindDownloadColumn = column => ({
    Header: makeHeaderReadable(column),
    id: column,
    Cell: ({ row }) => {
      return (
        <a
          href={row?.original?.url}
          target="_blank"
          style={{ color: "#21ba45" }} 
          rel="noreferrer"
        ><i className="fa fa-download" /></a>
      );
    },
  });