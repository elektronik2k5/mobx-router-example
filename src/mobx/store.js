import AppStore from '../mobx/stores/app-store';
// import {RouterStore} from 'mobx-router';
import { types, getSnapshot, } from 'mobx-state-tree';
import { toJS, } from 'mobx'


const { string, map, } = types

const RouterStore = types.model('RouterStore', {
  params: map(string),
  queryParams: map(string),
  currentView: types.frozen,
})
.views(self => ({
  get currentPath(){
    return self.currentView ? self.currentView.replaceUrlParams(self.params, self.queryParams) : '';
  },
  get snapshot(){
    return getSnapshot(self)
  },
}))
.actions(self => ({
  goTo(view, paramsObj = {}, store, queryParamsObj = {}){
    const nextPath = view.replaceUrlParams(paramsObj, queryParamsObj);
    const pathChanged = nextPath !== self.currentPath;

    if (!pathChanged) {
      return;
    }

    const rootViewChanged = !self.currentView || (self.currentView.rootPath !== view.rootPath);
    const currentParams = toJS(self.params);
    const currentQueryParams = toJS(self.queryParams);

    const beforeExitResult = (rootViewChanged && self.currentView && self.currentView.beforeExit) ? self.currentView.beforeExit(self.currentView, currentParams, store, currentQueryParams) : true;
    if (beforeExitResult === false) {
      return;
    }

    const beforeEnterResult = (rootViewChanged && view.beforeEnter) ? view.beforeEnter(view, currentParams, store, currentQueryParams) : true
    if (beforeEnterResult === false) {
      return;
    }

    const nextParams = toJS(paramsObj);
    const nextQueryParams = toJS(queryParamsObj);
    const onParamsChangeResult = (!rootViewChanged && self.currentView && self.currentView.onParamsChange) ?
      self.currentView.onParamsChange(self.currentView, nextParams, store, nextQueryParams) : true
    if (onParamsChangeResult === false) {
      return;
    }

    rootViewChanged && self.currentView && self.currentView.onExit && self.currentView.onExit(self.currentView, currentParams, store, currentQueryParams);
    
    self.currentView = view
    self.params = toJS(paramsObj)
    self.queryParams = toJS(queryParamsObj);
    
    rootViewChanged && view.onEnter && view.onEnter(view, nextParams, store, nextQueryParams);
  }
}))


const store = {
  app: new AppStore(),
  router: RouterStore.create({
    params: {},
    queryParams: {},
    currentView: '',
  })
};

window.store = store

export default store;