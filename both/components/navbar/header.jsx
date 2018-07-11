var React = require('react')
import {TopMenu, MenuItem, MenuBrand } from './header-items'

export default class Header extends React.Component {
    render() {
        return (
            <TopMenu TopMenu autoClose={true} animate={true} cssTransitions={true} align="right" duration={200} threshold={769}>
                <MenuBrand>
                    <a data-scroll href="#home">Inspired=Ed</a>
                </MenuBrand>
                <MenuItem>
                    <a data-scroll href="#home">Home</a>
                </MenuItem>
                <MenuItem>
                    <a data-scroll href="#about">About</a>
                </MenuItem>
                <MenuItem>
                    <a data-scroll href="#configuration">Feature</a>
                </MenuItem>
                <MenuItem>
                    <a data-scroll href="#contribute">Contribute</a>
                </MenuItem>
            </TopMenu>
        )
    }
}