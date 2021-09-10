import React from 'react'
import { AppBar, Box, Breadcrumbs, Divider, IconButton, Theme, Toolbar, Typography } from '@material-ui/core'
import { Link as MuiLink } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core'
import { Menu as MenuIcon } from 'mdi-material-ui'
import { Link } from 'react-router-dom'

export interface Breadcrumb {
  key: string
  icon?: React.ReactElement
  text: string
  to?: string
}
export interface HeaderProps {
  title: React.ReactNode
  titleWidth?: number
  onDrawerToggle: () => void
  breadcrumbs?: Breadcrumb[]
}

const Header: React.FC<HeaderProps> = props => {
  const { title, children, onDrawerToggle, breadcrumbs } = props
  const classes = useStyles(props)

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <div className={classes.appBarContent}>
        <Toolbar disableGutters={true} className={classes.title}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerToggle}
            edge="start">
            <MenuIcon />
          </IconButton>
          {typeof title === 'string' ? (
            <Typography variant="h6" className={classes.grow}>
              <Box lineHeight={1}> {title}</Box>
            </Typography>
          ) : (
            { title }
          )}
          <Divider orientation="vertical" flexItem />
        </Toolbar>
        <Toolbar className={classes.grow}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs?.map(item =>
              item.to ? (
                <MuiLink component={Link} key={item.key} color="inherit" to={item.to} className={classes.breadcrumb}>
                  {item.icon && React.cloneElement(item.icon, { className: classes.breadcrumbIcon })}
                  {item.text}
                </MuiLink>
              ) : (
                <Typography key={item.key} className={classes.breadcrumb}>
                  {item.icon && React.cloneElement(item.icon, { className: classes.breadcrumbIcon })}
                  {item.text}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Toolbar>
        <Toolbar>{children}</Toolbar>
      </div>
    </AppBar>
  )
}

const useStyles = makeStyles<Theme, HeaderProps>((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    flex: {
      display: 'flex',
    },
    root: {
      display: 'flex',
      height: '100%',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarContent: {
      display: 'flex',
    },
    title: {
      width: ({ titleWidth = 240 }) => titleWidth,
      padding: theme.spacing(0, 0, 0, 2),
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
    },
    breadcrumbIcon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  })
)

export default Header
