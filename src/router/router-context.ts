// Router context to share routing state across components
export interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

let routerContext: RouterContextType | null = null;

export const setRouterContext = (context: RouterContextType) => {
  routerContext = context;
};

export const getRouterContext = (): RouterContextType | null => {
  return routerContext;
};
