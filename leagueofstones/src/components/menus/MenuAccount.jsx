import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import {withRouter} from 'react-router';

import DashboardIcon from 'material-ui-icons/Dashboard';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import RoomIcon from 'material-ui-icons/Room';
import SearchIcon from 'material-ui-icons/Search';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import EventIcon from 'material-ui-icons/Event';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import HighlightOffIcon from 'material-ui-icons/HighlightOff';
import MailOutlineIcon from 'material-ui-icons/MailOutline';

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  listText: {
	  textAlign: 'left',
  }
};

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  goTo = (link) => {
	this.props.history.push('/'+link);
	this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <Button
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
			{this.props.children}
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={() => this.goTo("nonAlaFusion")}> 
						<ListItemIcon className={classes.icon}>
							<RoomIcon />
						</ListItemIcon>
						<ListItemText className={classes.listText} primary="Ajouter Jardin" />
					</MenuItem>
                    <MenuItem onClick={() => this.goTo("search_garden")}><ListItemIcon className={classes.icon}>
						<SearchIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Recherche Jardin" />
					</MenuItem>
                    <MenuItem onClick={() => this.goTo("my_gardens")}><ListItemIcon className={classes.icon}>
						<DashboardIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Mes Jardins" />
					</MenuItem>
					<MenuItem onClick={() => this.goTo("search_garden")}><ListItemIcon className={classes.icon}>
						<EventIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Ajouter Evénement" />
					</MenuItem>
					<MenuItem onClick={() => this.goTo("profil")}><ListItemIcon className={classes.icon}>
						<AccountBoxIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Mon Profil" />
					</MenuItem>
					<MenuItem onClick={() => this.goTo("messagerie")}><ListItemIcon className={classes.icon}>
						<MailOutlineIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Demandes Jardin" />
					</MenuItem>
					<MenuItem onClick={this.handleClose}><ListItemIcon className={classes.icon}>
						<HighlightOffIcon />
					  </ListItemIcon>
					  <ListItemText className={classes.listText} primary="Logout" onClick={this.props.logout}/>
					</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MenuListComposition));