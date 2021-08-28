import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//toast
import { ToastContainer } from 'react-toastify';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//components
import LoadingIcon from './js/components/shared/loadingIcon/LoadingIcon';
const ChartComponent = lazy(() => import('./js/containers/candleChart/CandleChart'));

const App = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIcon />
			</div>
		}
	>
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onReset={() => {
				//Reset the state of your app so the error doesn't happen again
				console.log('Try again clicked');
			}}
		>
			<h1>Google stock performance</h1>
			<ChartComponent />
		</ErrorBoundary>
		<ToastContainer />
	</Suspense>
);

export default hot(App);
