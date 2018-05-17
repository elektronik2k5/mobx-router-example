import React from 'react';
import { inject, observer, } from 'mobx-react';
import {Link} from 'mobx-router';
import views from '../../config/views';
import _ from 'lodash';


function Gallery({ store, }) {
  const { queryParams, } = store.router.snapshot
  const LinkWithStart = ({ start, }) => (
    <li>
      <Link {...{
        view: views.gallery,
        store,
        queryParams: start ? { start, } : {},
        children: `Go to gallery, ${ start ? 'start at ' + start : 'empty queryParams' }`,
      }} />
    </li>
  )
  return (
    <React.Fragment>
      <h3>Gallery</h3>
      {
        !_.isEmpty(queryParams) && (
          <ol>
            {_.map(queryParams, (param, key) => <li key={key}>{key} - <b>{param}</b></li>)}
          </ol>
        )
      }
      <h4>Links</h4>
      <ul>
        <LinkWithStart />
        <LinkWithStart {...{ start: '10', }} />
        <LinkWithStart {...{ start: '1000', }} />
      </ul>
    </React.Fragment>
  )
}

export default inject('store')(observer(Gallery))
