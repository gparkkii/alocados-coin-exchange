import React, { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PATH } from './path';
import BaseLayout from 'layouts/BaseLayout';

const Loadable = <P extends object>(Component: React.ComponentType<P>) => {
  const LoadableComponent = (props: P) => (
    <Suspense fallback={<div>...loading</div>}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

const ExchangePage = Loadable(
  lazy(() => import('pages/exchange/ExchangePage')),
);
const HistoryPage = Loadable(lazy(() => import('pages/history/HistoryPage')));

export const router = createBrowserRouter([
  {
    path: PATH.root,
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to={PATH.exchange} replace /> },
      { path: PATH.exchange, element: <ExchangePage /> },
      { path: PATH.history, element: <HistoryPage /> },
    ],
  },
]);
