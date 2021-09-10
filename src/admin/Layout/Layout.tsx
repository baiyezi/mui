import React from 'react'
import { Toolbar } from '@material-ui/core'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import Header, { Breadcrumb } from '../Header'
import Sider, { SiderMenuDataItem } from '../Sider'
import { useLocation } from 'react-router-dom'

export interface LayoutProps {
  leftWidth?: number
  title: React.ReactNode
  menus: SiderMenuDataItem[][]
}

const Layout: React.FC<LayoutProps> = ({ title, menus, leftWidth, children }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleDrawerToggle = () => setOpen(!open)

  // 根据 pathname 定位菜单以及面包屑
  const { pathname } = useLocation()
  const currentMenus = findMenus(menus, pathname)

  console.log(currentMenus)

  return (
    <div className={classes.root}>
      <Header
        breadcrumbs={currentMenus as Breadcrumb[]}
        title={title}
        titleWidth={leftWidth}
        onDrawerToggle={handleDrawerToggle}></Header>
      <Sider selectedList={currentMenus} menus={menus} open={open} drawerWidth={leftWidth}></Sider>
      <main className={classes.content}>
        <Toolbar></Toolbar>
        <div className={classes.grow}>{children}</div>
      </main>
    </div>
  )
}

// 找出 to 最长的一组菜单
const findLongerPathMenus = (menus: SiderMenuDataItem[][]) => {
  return menus.reduce<SiderMenuDataItem[]>((result, item) => {
    if (result.length === 0 || item[item.length] > result[result.length]) {
      result = item
    }
    return result
  }, [])
}

const findMenus = (menus: SiderMenuDataItem[][], path: string) => {
  const allResult = menus.reduce<SiderMenuDataItem[][]>((allResult, item) => {
    const result = findMenu(item, path)
    return allResult.concat(result)
  }, [])
  console.log(allResult)
  return findLongerPathMenus(allResult)
}

const findMenu = (
  menus: SiderMenuDataItem[],
  path: string,
  parents: SiderMenuDataItem[] = [],
  result: SiderMenuDataItem[][] = []
) => {
  menus.forEach(item => {
    parents.push(item)
    if (item.to && path.indexOf(item.to) === 0) {
      result.push(parents)
    } else if (item.children?.length) {
      findMenu(item.children, path, parents, result)
    }
    parents = []
  })
  return result
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
      height: '100%',
    },
    content: {
      flexGrow: 1,
      flexDirection: 'column',
      display: 'flex',
      padding: theme.spacing(3),
    },
  })
)

export default Layout
