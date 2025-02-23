import {Suspense, lazy} from 'react';

export default function lazyHOC(fnLoad) {
  var LazyComponent = lazy(fnLoad);
  return function LazyHOComponent(props) {
    return (
      <Suspense fallback={<span>Loading...</span>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
