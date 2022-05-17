import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Common, Task, UserTask } from "../../api/models/models";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const UserTaskList = ({
    tasks, 
}: {
    tasks: Array<UserTask>; 
}) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">ID</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">Name</Typography></TableCell>
                       
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">Status</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "1500px" }}><Typography variant="body1" textAlign="left">Assignee</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "150px" }}><Typography variant="body1" textAlign="left">Assigned By</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "150px" }}><Typography variant="body1" textAlign="left">Modified</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(tasks && tasks.length > 0) ? tasks.map((taskItem) => <TableRow style={{ cursor: "pointer" }}>

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {taskItem.id}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {taskItem.name}
                            </Typography>
                        </TableCell>
                        
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {taskItem.status}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {taskItem.assignee}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {taskItem.assignedBy}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {formatDateTime(taskItem.timestamp)}
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

export default UserTaskList;