const React      = require('react')
const tweenState = require('react-tween-state')
const ReactDOM   = require('react-dom')

import { isBrowser, isServer } from '../../util/environmentDetection'

const Item = React.createClass({
    render: function() { return null; }
})

const Brand = React.createClass({
    render: function() { return null; }
})

const TopMenu = React.createClass({
    mixins: [tweenState.Mixin],
    getDefaultProps: function() {
        return {
            align          : 'left',
            brandAlign     : 'left',
            autoClose      : true,
            threshold      : 769,
            cssTransitions : false,
            animate        : true,
            duration       : 300
        };
    },
    getInitialState: function() {
        const innerWidth = isBrowser ? window.innerWidth : 0
        return {
            expanded: false,
            wide: innerWidth >= this.props.threshold,
            scrolled   : isBrowser ? window.pageYOffset > 1 : false,
            maskHeight : 0
        }
    },
    toggleExpanded: function() {
        const expanded = !this.state.expanded
        const height = ReactDOM.findDOMNode(this.refs.anchor).clientHeight
        if (true === this.props.animate) {
            this.setState({expanded: expanded});
            this.tweenState('maskHeight', {
                easing   : tweenState.easingTypes.easeInOutQuad,
                duration : this.props.duration,
                endValue : (expanded ? height : 0)
            });
        } else {
            this.setState({
                expanded   : expanded,
                maskHeight : (expanded ? height : 0)
            });
        }
    },
    handleResize: function() {
        var innerWidth = window.innerWidth,
            oldWide = this.state.wide,
            newWide = innerWidth >= this.props.threshold;
        if (true === this.state.expanded && true === oldWide && false === newWide) {
            this.setState({
                expanded   : false,
                maskHeight : 0,
                wide       : false
            })
            return;
        }
        if (oldWide != newWide)
            this.setState({wide: newWide});
    },
    handleScroll: function(e) {
        var scrolled = this.state.scrolled,
            newScrolled = window.pageYOffset > 1;
        if (scrolled != newScrolled)
            this.setState({scrolled: newScrolled});
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    },
    render: function() {
        const self = this
        let brandStyle = {}
        let buttonStyle = {}
        if ('right' === this.props.brandAlign) {
            brandStyle  = {float: 'right'};
            buttonStyle = {float: 'left'};
        }
        let brand = <span />
        const items =
            React.Children.map(self.props.children, (item) => {
                if (item.type === Item) {
                    const onClick = () => {
                        if ('function' === typeof item.props.onClick) {
                            item.props.onClick()
                        }
                        if (true === self.props.autoClose) {
                            self.toggleExpanded()
                        }
                    }
                    return (
                        <li onClick={onClick.bind(self)}>
                            {item.props.children}
                        </li>
                    )
                } else if (item.type === Brand) {
                    brand = (
                        <span style={brandStyle} className={'nav-logo ' + (true === this.state.wide ? 'nav-logo-full' : 'nav-logo-compact')}>
                            {item.props.children}
                        </span>
                    )
                } else {
                    return item
                }
            })

        const animClass = (true === this.props.cssTransitions) ? 'nav-transitions' : ''
        if (true === this.state.wide) {
            const cssClass = this.state.scrolled ? 'sticky' : 'fixed';
            return (
                <header className={animClass ? (cssClass + ' ' + animClass) : cssClass}>
                    {brand}
                    <nav className={'nav-collapse nav-full' + ('right' === this.props.align ? ' nav-right' : '')}>
                        <ul ref="anchor">
                            {items}
                        </ul>
                    </nav>
                </header>
            );
        } else {
            return (
                <header className={animClass}>
                    {brand}
                    <a style={buttonStyle} href="javascript:" onClick={this.toggleExpanded} className={'nav-toggle' + (this.state.expanded ? ' active' : '')}>Menu</a>
                    <nav className="nav-collapse nav-compact">
                        <div className="mask" style={{height: this.getTweeningValue('maskHeight')}}>
                            <ul ref="anchor">
                                {items}
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        }
    }
})


module.exports = {
    TopMenu   : TopMenu,
    MenuItem  : Item,
    MenuBrand : Brand
}