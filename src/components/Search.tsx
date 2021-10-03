import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchContainer: {
      paddingBottom: theme.spacing(1),
    },
    search: {
      flex: "1 1 auto",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #777d80",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      fontSize: "0.875rem",
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);

interface ISearchProps {
  onHandleSearch: (event: React.ChangeEvent<{ value: unknown }>) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
}

const Search: React.FC<ISearchProps> = ({
  onHandleSearch,
  value,
  placeholder,
  disabled
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.searchContainer}>
      <Grid className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          fullWidth
          placeholder={placeholder || "Search"}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={onHandleSearch}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default Search;
