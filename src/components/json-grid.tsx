import React, { useEffect } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'; 
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'; 
import { DataRow } from '../api/models/models';
import ReactJson from 'react-json-view'; 

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
            marginRight: theme.spacing(2.5),

        },
    }),
);


interface PaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function PaginationActions(props: PaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;



    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };


    return (
        <div className={classes.root}>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton   onClick={handleNextButtonClick}   aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>

        </div>
    );
}

const JsonGrid = (
    {
        rows,
        page,
        setPage,
        onLoadMore,
        hasMore
    }: {
        rows: Array<DataRow>;
        page: number;
        setPage: (page: number) => void;
        onLoadMore: (index: number) => void;
        hasMore: boolean;
    }) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
       
        if (newPage > page) {
            if (hasMore) {
                setPage(newPage);
                onLoadMore(newPage);
            } else {
                if (rows.slice(newPage * rowsPerPage, rows.length).length > 0) {
                    setPage(newPage);
                }
            }

        } else {
            setPage(newPage);
        }



    };

    useEffect(() => {
    

    }, [hasMore, rows])


    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={`row_${row.id}`} sx={{ "&:hover": { backgroundColor: "inherit" } }}>

                            <TableCell key={`cell_${row.id}`}>
                                <ReactJson key={`json_${row.id}`}
                                    src={JSON.parse(row.payload)}
                                    collapseStringsAfterLength={90}
                                    collapsed={true}
                                    enableClipboard={false}
                                    displayObjectSize={false}
                                    displayDataTypes={false}
                                    indentWidth={4}
                                    theme={{
                                        base00: "#666666", //collapsed triangle
                                        base01: "rgba(0,0,0,0)", //input in edit mode
                                        base02: "rgba(0,0,0,0)", //left line of the json
                                        base03: "#666666",
                                        base04: "purple",
                                        base05: "pink",
                                        base06: "blue",
                                        base07: "#666666", //all keys
                                        base08: "fucsia",
                                        base09: "#666666", //string values
                                        base0A: "#666666",
                                        base0B: "#666666", //number values
                                        base0C: "yellow",
                                        base0D: "#666666",
                                        base0E: "#666666", //boolean values
                                        base0F: "pink"
                                    }}
                                    style={{ fontSize: "10px", backgroundColor: "transparent", boxSizing: "content-box" }} />

                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            ActionsComponent={PaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default JsonGrid;