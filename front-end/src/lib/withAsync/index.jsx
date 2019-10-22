import React from 'react';

/**
 * React 컴포넌트를 비동기(+ chunk) 로드 하는 function
 * @param params {Object}
 * @param params.getComponent {function} 컴포넌트 로딩 함수
 * @param params.loading 컴포넌트 로딩 중, 표시할 loading 화면
 * @return {AsyncComponent} 주어진 컴포넌트가 비동기로 로드되는 HOC 컴포넌트
 */
export default function withAsync({ getComponent, loading = null }) {
  return class AsyncComponent extends React.Component {
    static Component = null;

    static loadComponent() { // The function we call before rendering
      return getComponent()
        .then(Component => {
          const Comp = Component.default;

          AsyncComponent.Component = Comp;
          AsyncComponent.displayName = `Async(${Comp.displayName})`;
          return Comp;
        })
        .catch(error => {
          console.log('error', error);
        });
    }

    state = {
      Component: AsyncComponent.Component,
    };

    mounted = false;

    /* eslint-disable camelcase */
    UNSAFE_componentWillMount() {
      if (this.state.Component === null) {
        AsyncComponent.loadComponent()
          .then(Component => {
            if (this.mounted) {
              this.setState({ Component });
            }
          });
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Component } = this.state;

      if (Component !== null) {
        return (<Component {...this.props} />);
      }
      return loading; // or <div /> with a loading spinner, etc..
    }
  };
}
