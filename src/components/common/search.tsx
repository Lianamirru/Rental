import TextField from "@mui/material/TextField";

type SearchProps = { value: string; onChange: (searchQuery: string) => void };

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
