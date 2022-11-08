function useDebounce(func: Function, waitInMs: number) {
  let timeout: NodeJS.Timeout;

  if (waitInMs <= 0) {
    throw new Error("Debouncing time must be a positive number");
  }

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(args);
    }, waitInMs);
  };
}

export default useDebounce;
