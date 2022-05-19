import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {   Issue,     } from "../../api/models/models";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const IssueList = ({
    issues, 
}: {
    issues: Array<Issue>;  
}) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">ID</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">Title</Typography></TableCell>
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">Status</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "1500px" }}><Typography variant="body1" textAlign="left">Assignee</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "150px" }}><Typography variant="body1" textAlign="left">Assigned By</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "150px" }}><Typography variant="body1" textAlign="left">Modified</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(issues && issues.length > 0) ? issues.map((issueItem) => <TableRow style={{ cursor: "pointer" }}>

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {issueItem.id}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {issueItem.title}
                            </Typography>
                        </TableCell>
                        
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {issueItem.status}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {issueItem.assignee}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {issueItem.reportedBy}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {formatDateTime(issueItem.timestamp)}
                            </Typography>
                        </TableCell>
                       
                        <TableCell align="right">
                            <IconButton size="small">
                                <MoreHorizIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>)

                        : <></>}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default IssueList;