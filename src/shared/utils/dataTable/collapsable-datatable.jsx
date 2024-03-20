import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tableHeadRowStyle, tableHeader } from "app";

function Row(props) {
  const { row, detailsHeadCells, detailsTableName } = props;
  const { values, detailsCells } = row;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, ...tableHeadRowStyle }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {values.map(({ component }, index) => {
          return <TableCell key={index}>{component}</TableCell>;
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {detailsTableName}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {detailsHeadCells &&
                      detailsHeadCells.map(({ label }, index) => {
                        return <TableCell key={index} sx={tableHeader}>{label}</TableCell>;
                      })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailsCells &&
                    detailsCells.map(({ values }, index) => {
                      return (
                        <TableRow key={index}>
                          {values.map(({ component }, index) => {
                            return (
                              <TableCell key={index}>{component}</TableCell>
                            )
                          }
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CollapsibleDataTable = ({
  headCells,
  rows,
  detailsHeadCells,
  detailsTableName,
}) => {
  const [tableRows, setTableRows] = React.useState();

  React.useEffect(() => {
    setTableRows(rows && rows.tableRows && rows.tableRows);
  }, [rows]);
  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={tableHeadRowStyle}>
                <TableCell></TableCell>
                {headCells &&
                  headCells.map(({ id, label }) => {
                    return (
                      <TableCell sx={tableHeader} key={id}>
                        {label}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            {tableRows && tableRows.length > 0 ? (
              <TableBody>
                {
                  tableRows.map((row, i) => (
                    <Row
                      key={i}
                      row={row}
                      detailsHeadCells={detailsHeadCells}
                      detailsTableName={detailsTableName}
                    />
                  ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableCell colSpan={headCells.length} align="center" sx={{ fontWeight: 500 }}>
                  <Typography> No Data Available</Typography>
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
