import * as React from 'react'

/**
 * Minimal component for navigation logic.
 *
 * Usage example:
 *
 * ```ts
 * type AppRoute = number
 *
 * class App extends React.Component {
 *   render() {
 *     return <Navigator initialRoute={1} render={this.renderNavigatorView} />
 *   }
 *
 *   renderNavigatorView = ({ route, bindRoute }: NavigatorRenderProps<AppRoute>) => (
 *     <main>
 *       <div className="tabs">
 *         <button onClick={bindRoute(1)}>tab title 1 {route === 1 && '(current)'}</button>
 *         <button onClick={bindRoute(2)}>tab title 2 {route === 2 && '(current)'}</button>
 *         <button onClick={bindRoute(3)}>tab title 3 {route === 3 && '(current)'}</button>
 *       </div>
 *       <div className="tab-views">
 *         {route === 1 && <div>ye</div>}
 *         {route === 2 && <div>xd</div>}
 *         {route === 3 && <div>owo</div>}
 *       </div>
 *     </main>
 *   )
 * }
 * ```
 */
export class Navigator<RouteType> extends React.Component<NavigatorProps<RouteType>> {
  state = {
    route: this.props.initialRoute,
  }

  setRoute = (route: RouteType) => {
    this.setState({ route })
  }

  bindRoute = (route: RouteType) => () => {
    this.setRoute(route)
  }

  render() {
    const rendered = this.props.render({
      route: this.state.route,
      setRoute: this.setRoute,
      bindRoute: this.bindRoute,
    })

    return React.Children.only(rendered)
  }
}

/** Props for actual Navigator component */
export type NavigatorProps<RouteType> = {
  initialRoute: RouteType
  render: (props: NavigatorRenderProps<RouteType>) => React.ReactNode
}

/** Props given to Navigator `render()` prop */
export type NavigatorRenderProps<RouteType> = {
  /** The current navigator route */
  route: RouteType

  /** Sets the current route */
  setRoute: (route: RouteType) => void

  /** Returns a function which sets the current route, as a helpful shorthand for event handlers */
  bindRoute: (route: RouteType) => () => void
}
