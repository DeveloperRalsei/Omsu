import { createContext, useContext, useState } from "react";
import { page } from "../../types";

type PageContextType = {
    currentPage: page;
    newsletterId?: string;
    setPage: (page: page, newsletterId?: string) => void;
};

const PageContext = createContext<PageContextType>({
    currentPage: "fetchBeatmap",
    setPage: () => {},
});

export function PageProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<{
        currentPage: page;
        newsletterId?: string;
    }>({
        currentPage: "fetchBeatmap",
    });

    function setPage(page: page, newsletterId?: string) {
        setState({ currentPage: page, newsletterId });
    }

    return (
        <PageContext.Provider
            value={{
                ...state,
                setPage,
            }}>
            {children}
        </PageContext.Provider>
    );
}

export function usePage() {
    return useContext(PageContext);
}
