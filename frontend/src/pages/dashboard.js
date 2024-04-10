import { useContext, lazy, Suspense } from 'react';
import SearchBar from '../components/Searchbar';
import DashboardContext from "../context/DashboardContext";
import FallbackDisplay from '../components/DashboardComps/FallbackDisplay';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardSkeleton from "../components/DashboardComps/skeleton"

const DashboardCards = lazy(() => import('../components/DashboardComps'));
// const DashboardSkeleton = lazy(() => import("../components/DashboardComps/skeleton"));

const Dashboard = () => {
    const { hasError } = useContext(DashboardContext);
    
    const DashboardComponent = hasError ? (
        <FallbackDisplay />
    ) : ( <>
                <Suspense fallback={<DashboardSkeleton />}>
                    <DashboardCards />
                </Suspense>
            
        </>)
    ;

    return (
        <div>
            <h3>It will all be there</h3>
            <SearchBar />
            <ErrorBoundary FallbackComponent={FallbackDisplay}
            onReset={() => window.location.reload()}>
                {DashboardComponent}
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard

