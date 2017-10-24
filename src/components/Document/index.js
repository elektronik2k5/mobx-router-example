import React, { Component, } from 'react'
import { observer, inject, } from 'mobx-react'


class Document extends Component {
  render(){
    const { params, } = this.props.store.router.snapshot
    return (
      <div>
        <h3> Document </h3>
        <div> with id: {params.id} </div>
      </div>
    );
  }
}

export default inject('store')(observer(Document))
