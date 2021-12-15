import { Collapse, List, ListItemIcon, ListItemText, ListItem, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { ChevronUp, ChevronDown } from 'mdi-material-ui'
import { Link } from 'react-router-dom'
import React from 'react'

export interface SiderMenuDataItem {
  key: string
  text: React.ReactNode
  icon?: React.ReactElement
  to?: string
  href?: string
  children?: SiderMenuDataItem[]
}

export interface SiderMenuItemProps {
  menu: SiderMenuDataItem
  level?: number
  selectedList?: SiderMenuDataItem[]
  childPadding: boolean
}

const SiderMenuItem: React.FC<SiderMenuItemProps> = ({
  childPadding,
  selectedList,
  menu,
  level = 0,
}) => {
  // 当前菜单项是否被选中/打开
  // 叶子节点被选中
  // 非叶子节点被展开
  const selected = selectedList?.some(item => item.key === menu.key)
  const { text, icon, to = '', href = '', children } = menu
  const [open, setOpen] = React.useState(selected)

  const hasChildren = children?.length
  const classes = useStyles({ level, childPadding })

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open)
    }
  }
  let ListItemComponent: React.ElementType<any>,
    listItemComponentProps = {}
  if (hasChildren) {
    ListItemComponent = 'li'
  } else if (to) {
    ListItemComponent = Link
    listItemComponentProps = { to }
  } else {
    ListItemComponent = 'a'
    listItemComponentProps = { href, target: '_blank', rel: 'noopener' }
  }

  return (
    <>
      <ListItem
        button
        // 叶子节点才被选中，非叶子节点直接展开
        selected={!hasChildren && selected}
        component={ListItemComponent}
        {...listItemComponentProps}
        onClick={handleClick}
        className={classes.listItem}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {hasChildren && (open ? <ChevronUp /> : <ChevronDown />)}
      </ListItem>
      {children?.length && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SiderMenu
            childPadding={childPadding}
            selectedList={selectedList}
            menus={children}
            level={level + 1}></SiderMenu>
        </Collapse>
      )}
    </>
  )
}

export interface SiderMenuProps {
  menus: SiderMenuDataItem[]
  level?: number
  selectedList?: SiderMenuDataItem[]
  childPadding: boolean
}
const SiderMenu: React.FC<SiderMenuProps> = ({ childPadding, selectedList, menus, level = 0 }) => {
  return (
    <List>
      {menus.map((item: SiderMenuDataItem) => (
        <SiderMenuItem
          childPadding={childPadding}
          selectedList={selectedList}
          key={item.key}
          level={level}
          menu={item}
        />
      ))}
    </List>
  )
}

const useStyles = makeStyles<Theme, { level: number; childPadding: boolean }>((theme: Theme) =>
  createStyles({
    listItem: {
      paddingLeft: props =>
        props.childPadding ? theme.spacing(2 + 2 * props.level) : theme.spacing(2),
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
)
export default SiderMenu
