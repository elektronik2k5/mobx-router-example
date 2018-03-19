import React, {Component} from 'react';
import { inject, observer, } from 'mobx-react';
import {Link} from 'mobx-router';
import views from '../../config/views';
import _ from 'lodash';

class Gallery extends Component {
  render() {
    const {store} = this.props;
    const { queryParams, } = this.props.store.router.snapshot
    return (
      <div>
        <h3>Gallery</h3>
        {!_.isEmpty(queryParams) && <ul>
          {_.map(queryParams, (param, key) => <li key={key}><span>{key}</span> - <b>{param}</b></li>)}
        </ul>
        }
        <Link view={views.gallery} store={store} queryParams={{}}>
          Go to gallery, empty queryParams
        </Link>
      </div>
    );
  }
}

export default inject('store')(observer(Gallery));
