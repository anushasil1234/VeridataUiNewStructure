import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
    Box,
    Checkbox,
    FormControlLabel,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { tableHeader, toolbarsx } from "app";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        headerCheckBox,
        onSelectAllClick,
        order,
        orderBy,
        numSelected = 0,
        rowCount = 0,
        onRequestSort,
        headCells,
    } = props;
    const createSortHandler = (property) => {
        onRequestSort(property);
    };
    const tableHeadRowStyle = {
        position: "sticky",
        top: 0,
        zIndex: 2,
        bgcolor: "#fff",
    };
    return (
        <TableHead>
            <TableRow sx={tableHeadRowStyle}>
                {headCells.map((headCell, i) => {
                    if (headCell.id === "checkBox") {
                        return headerCheckBox ? (
                            <Checkbox
                                key={i}
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    "aria-label": "select all desserts",
                                }}
                            />
                        ) : (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}
                            ></TableCell>
                        );
                    } else {
                        return (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
                                    onClick={(event) => createSortHandler(headCell.id)}
                                    sx={tableHeader}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { tableTitle } = props;

    return (
        <Toolbar sx={toolbarsx}>
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {tableTitle}
            </Typography>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    tableTitle: PropTypes.string,
};

const DataTable = ({
    headerCheckBox = true,
    rows,
    setRows,
    headCells,
    selected,
    setSelected,
    checBoxRequired,
    isPaginationOn = true,
    isShowMoreRowsOn = true,
}) => {
    const [tableRows, setTableRows] = useState();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("companyName");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [countCheckBoxEnabledRows, setCountCheckBoxEnabledRows] = useState(0);

    useEffect(() => {
        setTableRows(rows && rows.tableRows && rows.tableRows);
    }, [rows]);
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        const sortArray =
            tableRows &&
            tableRows.sort((a, b) => {
                const currentValueIndex = a.values.findIndex(
                    ({ id }) => id === property
                );
                return !isAsc
                    ? String(
                        a.values[currentValueIndex].component.props.props.tableRow[
                        property
                        ]
                    ).localeCompare(
                        String(
                            b.values[currentValueIndex].component.props.props.tableRow[
                            property
                            ]
                        )
                    )
                    : String(
                        b.values[currentValueIndex].component.props.props.tableRow[
                        property
                        ]
                    ).localeCompare(
                        String(
                            a.values[currentValueIndex].component.props.props.tableRow[
                            property
                            ]
                        )
                    );
            });
        rows.tableRows = sortArray;
        setRows(rows);
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let newSelected = [];
            let countCheckBoxEnabledRows = 0;
            rows &&
                rows.tableRows &&
                rows.tableRows.forEach(({ isCheckDisabled }, index) => {
                    let currentIndex;

                    if (isCheckDisabled === undefined) {
                        currentIndex = index;
                    } else {
                        if (!isCheckDisabled) {
                            countCheckBoxEnabledRows++;
                            currentIndex = index;
                            newSelected = [...newSelected, currentIndex];
                        }
                    }
                });
            setCountCheckBoxEnabledRows(countCheckBoxEnabledRows);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };
    const handleClick = (index) => {
        const selectedIndex = selected && selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected && selected.slice(1));
        } else if (selectedIndex === selected && selected.length - 1) {
            newSelected = newSelected.concat(selected && selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected && selected.slice(0, selectedIndex),
                selected && selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (name) => selected && selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: "100%", mt: 5 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected && selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={
                                countCheckBoxEnabledRows
                                    ? countCheckBoxEnabledRows
                                    : tableRows && tableRows.length
                            }
                            headCells={headCells}
                            checBoxRequired={checBoxRequired}
                            headerCheckBox={headerCheckBox}
                        />
                        <TableBody>
                            {tableRows && tableRows.length > 0 ? (
                                <>
                                    {stableSort(tableRows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(index);
                                            const isCheckDisabled = row.isCheckDisabled;
                                            return (
                                                <TableRow
                                                    hover
                                                    appointeeId={row.appointeeId}
                                                    onClick={() =>
                                                        headCells[0].id === "checkBox" &&
                                                        !isCheckDisabled &&
                                                        handleClick(index)
                                                    }
                                                    role="checkbox"
                                                    aria-checked={true}
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={
                                                        isCheckDisabled === true ? true : isItemSelected
                                                    }
                                                >
                                                    {row.values.map(({ id, type, component }, index) => {
                                                        let padding;
                                                        let currentComponent = component;
                                                        if (type === "checkBox") {
                                                            padding = "checkBox";
                                                            currentComponent = (
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={
                                                                        isCheckDisabled === true
                                                                            ? false
                                                                            : isItemSelected
                                                                    }
                                                                />
                                                            );
                                                        }
                                                        return (
                                                            <TableCell key={index} padding={padding}>
                                                                {currentComponent}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}

                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={headCells.length}
                                        align="center"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        <Typography> No Data Available</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {isPaginationOn && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={tableRows?.length > 0 ? tableRows?.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
            {isShowMoreRowsOn && (
                <Stack direction={"row"} py={2} justifyContent="space-between">
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Compact View"
                    />
                </Stack>
            )}
        </Box>
    );
};

DataTable.propTypes = {
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func,
    headCells: PropTypes.array,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    checBoxRequired: PropTypes.bool,
    isPaginationOn: PropTypes.bool,
    isShowMoreRowsOn: PropTypes.bool,
};
export { DataTable };
