import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Column } from "../../api/models/models";
import TagsInput from "../tagsInput";

const ColumnSchemaTagList = ({
    columns,
    handleTagsChange
}:{
    columns:Array<Column>; 
    handleTagsChange: (name: string, tags: Array<string>) =>void;
}) => {
    const { t } = useTranslation();
    
    return (
        <TableContainer>
        <Table size="small" aria-label="source schema table">
            <TableHead>
                <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                    <TableCell variant="head"><Typography variant="body1">{t('labels.column')}</Typography></TableCell>
                    <TableCell variant="head" align="left"><Typography variant="body1">{t('labels.type')}</Typography></TableCell>
                    <TableCell variant="head" align="left"><Typography variant="body1">{t('labels.tags')}</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {columns.map((col, index) => <TableRow key={`row${index}`}>
                    <TableCell component="th" scope="row">
                    <Typography variant="body1">{col.name}</Typography>
                    </TableCell>
                    <TableCell align="left"><Typography variant="body1">{col.type}</Typography></TableCell>
                    <TableCell >
                        <TagsInput
                            enabled={true}
                            onTagsChange={(tags) => handleTagsChange(col.name, tags)}
                            fullWidth
                            variant="outlined"
                            key={`select${col.name}`}
                            id="tags"
                            name="tags"
                            placeholder={t('labels.addTags')}
                            tags={col.tags}

                            label={t('labels.tags')}
                        />
                    </TableCell>

                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default ColumnSchemaTagList;