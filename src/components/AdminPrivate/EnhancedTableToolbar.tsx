import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';


interface EnhancedTableToolbarProps {
    numSelected: number;
    onDeleteClick: () => void;
  }
  
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected , onDeleteClick} = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={onDeleteClick}/>
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  export default EnhancedTableToolbar;