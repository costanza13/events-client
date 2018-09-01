import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  IconButton,
  MenuItem,
  MenuList,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ButtonNavLink from 'ui/ui-elements/ButtonNavLink'
import * as authActions from 'store/actions/auth-actions'
/* Dev */
// eslint-disable-next-line
import { green } from 'logger'

class  LoggedIn extends React.Component {
  state = {
    open: false,
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = (event, control) => {

    if (this.anchorEl.contains(event.target)) {
      green('going to return')
      return
    }
    green('event', event.target)
    green('control', control)
    green('props', this.props)
    this.setState({ open: false })
    this.props.userLogoutRequest()

  }
  render() {
    const { open } = this.state
    return (
      <React.Fragment>
        <ButtonNavLink to='/events'>
          Home
        </ButtonNavLink>
        <ButtonNavLink to='/new-event'>
          Create Event
        </ButtonNavLink>
        <ButtonNavLink to='/my-events'>
          My Events
        </ButtonNavLink>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node
          }}
          aria-owns={open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <AccountCircle />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={(event) => this.handleClose(event, 'profile')}>Profile</MenuItem>
                    <MenuItem onClick={(event) => this.handleClose(event, 'settings')}>Settings</MenuItem>
                    <MenuItem onClick={(event) => this.handleClose(event, 'logout')}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }
}

const styles = {}

const mapStateToProps = (state) => ({

})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, authActions),
)(LoggedIn)