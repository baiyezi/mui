import React from 'react'
import clsx from 'clsx'
import { Drawer, Toolbar, List, Divider, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import SiderMenu, { SiderMenuDataItem } from './SiderMenu'

export * from './SiderMenu'

export interface SiderProps {
  drawerWidth?: number
  open: boolean
  menus: SiderMenuDataItem[][]
  selectedList?: SiderMenuDataItem[]
}

const Sider: React.FC<SiderProps> = props => {
  const { menus, selectedList, open = true } = props
  const classes = useStyles(props)

  const drawerClass = clsx(classes.drawer, {
    [classes.drawerClose]: !open,
    [classes.drawerOpen]: open,
  })
  return (
    <Drawer variant="permanent" className={drawerClass} classes={{ paper: drawerClass }}>
      <Toolbar></Toolbar>
      <List>
        {menus.map((groupMenus, i) => (
          <React.Fragment key={i}>
            <SiderMenu childPadding={open} selectedList={selectedList} menus={groupMenus} />
            {i !== menus.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

const useStyles = makeStyles<Theme, SiderProps>((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    },
    drawerClose: {
      width: theme.spacing(7) + 1,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawerOpen: {
      overflowX: 'hidden',
      width: ({ drawerWidth = 240 }) => drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
)

export default Sider
