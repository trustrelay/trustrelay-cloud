import React, { Fragment, useEffect, useState } from "react";
import { Chip, makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import _ from "lodash";
const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: "5px"
  }
})
)

type TagsInputProps = TextFieldProps & {
  placeholder: string;
  tags?: Array<string>;
  onTagsChange: (items: Array<string>) => any;
  enabled?: boolean;
}

const TagsInput = (props: TagsInputProps) => {

  const css = useStyles();
  const { onTagsChange, placeholder, tags, enabled, ...other } = props;
  const [inputValue, setInputValue] = useState("");
  const emptyArray: Array<string> = []
  const [selectedItems, setSelectedItems] = useState(emptyArray);



  useEffect(() => {
    if (tags && !_.isEqual(tags, selectedItems)) {
      
      setSelectedItems(tags);
    }

    


  }, [tags, enabled]);

  // useEffect(() => { 
  //   if(selectedItems && !_.isEqual(tags, selectedItems)){
  //     onTagsChange(selectedItems);  
  //   }

  // }, [selectedItems]);

  const handleKeyDown = (event: any) => {
    
    if (event.key === "Enter") {
      const newSelectedItems = [...selectedItems];
      const duplicatedValues = newSelectedItems.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItems.push(event.target.value.trim());
      setSelectedItems(newSelectedItems);

      setInputValue("");

      onTagsChange(newSelectedItems); //new
    }
    if (
      selectedItems.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      const newSelection = selectedItems.slice(0, selectedItems.length - 1)
      setSelectedItems(newSelection);

      onTagsChange(newSelection); //new
    }
  }

  // const handleChange = (item:any) => {
 
  //   let newSelectedItems = [...selectedItems];
  //   if (newSelectedItems.indexOf(item) === -1) {
  //     newSelectedItems = [...newSelectedItems, item];
  //   }
  //   setInputValue("");
  //   setSelectedItems(newSelectedItems);
  // }

  const handleDelete = (item: any) => {
    if (enabled) {
       
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(newSelectedItems.indexOf(item), 1);
      setSelectedItems(newSelectedItems);

      onTagsChange(newSelectedItems); //new
    }

  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }


  return (
    <Fragment>

      <TextField
        name="tagsInput"
        autoComplete="off"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={!props.enabled || (selectedItems.length > 5)}
        InputProps={{
          startAdornment:
            selectedItems.map(item => <Chip
              key={item}
              tabIndex={-1}
              label={item}
              sx={{ marginRight: "3px" }}
              className={css.chip}
              color="primary"
              onDelete={() => handleDelete(item)}
            />)


        }}
      />
    </Fragment>
  )
}

export default TagsInput;