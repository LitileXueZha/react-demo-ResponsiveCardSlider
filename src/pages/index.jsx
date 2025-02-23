import { Suspense, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import {connect} from 'react-redux';
import emmet from 'emmet';

import './index.scss';

import { fakeRequest } from 's/utils/fakeRequest.js';
import lazyHOC from 's/components/lazyHOC.js';
import {getCards} from 's/store/card.js';
// import CardList from './CardList.jsx';
import {EosLoading} from 's/assets/SVGIcons.jsx';

var CardList = lazyHOC(() => import(/* webpackChunkName: 'cards' */'./CardList.jsx'));

function Home(props) {
  var title = useRef(emmet('lorem6')).current;
  var desc = useRef(emmet('lorem16-30')).current;
  var cardPromise = useMemo(() => props.getCards(), []);
  var [msg, formAction, isPending] = useActionState(submitInfo);

  // useEffect(() => {
  //   props.getCards();
  // }, []);

  return (
    <div>
      <section className="intro">
        <h1 className='title'>{title}</h1>
        <p className='desc'>{desc}</p>
        <form action={formAction}>
          {/* 服务端下发有效期的 csrf token 以防止 CSRF 攻击 */}
          <input type="hidden" name="csrftoken" value="xxxxx-xx" />
          <button className="btn" disabled={isPending} type='submit'>
            {isPending && <EosLoading />}
            Get started
          </button>
        </form>
        <Suspense fallback={<span>Data is loading...</span>}>
          <CardList cardPromise={cardPromise} card={props.card} />
        </Suspense>
      </section>
    </div>
  );
}

async function submitInfo(data) {
  var info = prompt('Your info is:');
  // 此处应转义用户输入，防止 XSS 攻击
  await fakeRequest(info);
}

function mapStateToProps(store) {
  return {card: store.card};
}
function mapDispatchToProps(dispatch) {
  return {
    getCards: (data) => dispatch(getCards(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
