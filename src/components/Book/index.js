import React, {Component} from 'react';
import { inject, observer, } from 'mobx-react';
import { toJS, } from 'mobx'

class Book extends Component {
  render() {
    const params = toJS(this.props.store.router.params)
    return (
      <div>
        <h1> Book {params.id} </h1>
        <h3> Page: {params.page} </h3>
      </div>
    );
  }
}

export default inject('store')(observer(Book));
