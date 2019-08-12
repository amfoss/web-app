import React from 'react';
import { Breadcrumbs, IBreadcrumbProps, Icon } from '@blueprintjs/core';

import classNames from 'classnames';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={classNames('title-bar')}
        style={this.props.noBottomMargin ? { marginBottom: 0 } : null}
      >
        {this.props.breadcrumbs ? <Breadcrumbs items={this.props.breadcrumbs} /> : null}
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default TitleBar;
