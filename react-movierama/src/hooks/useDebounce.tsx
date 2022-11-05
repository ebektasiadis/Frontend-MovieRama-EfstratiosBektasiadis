function useDebounce(func: Function, waitInMs: number) {
  let timeout: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(args);
    }, waitInMs);
  };
}

export default useDebounce;
